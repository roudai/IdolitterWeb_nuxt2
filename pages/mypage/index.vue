<template>
  <div v-if="created">
    <h5>マイページ</h5>
    <vue-good-table
      ref="idol-table"
      :columns="columns"
      :rows="rows"
      :compact-mode="compactMode"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'number', type: 'desc' },
      }"
      :pagination-options="{
        enabled: true,
        perPage: perPage,
        setCurrentPage: currentPage,
        perPageDropdown: [5, 10, 30],
        dropdownAllowAll: false,
        nextLabel: '次',
        prevLabel: '前',
        rowsPerPageLabel: '表示数',
        infoFn: (params) => `${params.currentPage} / ${params.totalPage}`,
      }"
      :search-options="{
        enabled: true,
        skipDiacritics: true,
        placeholder: '検索',
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
    >
      <div slot="emptystate">
        「アイドル一覧」から、アイドルを追加してください。
      </div>
    </vue-good-table>

    <div class="columns mt-3">
      <div class="column">
        <h5 class="ml-5">全期間</h5>
        <apex-charts
          :options="options"
          :series="series"
          :width="piChartsWidth"
          :height="piChartsHeight"
        ></apex-charts>
      </div>
      <div class="column">
        <span class="icon" style="float: left" @click="prevClick">
          <svg viewBox="0 0 24 24">
            <path :d="mdiSkipPrevious" />
          </svg>
        </span>
        <span style="float: left">{{ setYear }}年{{ setMonth }}月</span>
        <span class="icon" @click="nextClick">
          <svg viewBox="0 0 24 24">
            <path :d="mdiSkipNext" />
          </svg>
        </span>
        <div v-if="monthData">
          <apex-charts
            :options="options_month"
            :series="series_month"
            :width="piChartsWidth"
            :height="piChartsHeight"
          ></apex-charts>
        </div>
        <div v-else>対象月のデータがありません</div>
      </div>
    </div>
    <div class="columns mt-3">
      <div class="column">
        <apex-charts
          :options="options_bar"
          :series="series_bar"
          :height="300"
        ></apex-charts>
      </div>
    </div>

    <div class="buttons mt-3">
      <b-button
        type="is-primary is-light"
        @click="$router.push('/mypage/addnew')"
        >アイドル登録</b-button
      >
      <b-button label="ログアウトする" type="is-info" @click="confirmLogout" />
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  query,
  orderBy,
  doc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'
import { mdiSkipPrevious, mdiSkipNext } from '@mdi/js'

export default {
  data() {
    return {
      monthData: true,
      mdiSkipPrevious,
      mdiSkipNext,
      created: false,
      querySnapshot: null,
      name: '',
      perPage: 10,
      perPageChangeFlag: false,
      totalPage: '',
      currentPage: '',
      windowWidth: '',
      piChartsWidth: 0,
      piChartsHeight: 0,
      setYear: '2023',
      setMonth: '01',
      compactMode: false,
      columns: [
        {
          label: '',
          field: 'edit',
          tdClass: 'add-text',
          sortable: false,
        },
        {
          label: '枚数',
          field: 'number',
          type: 'number',
        },
        {
          label: '名前',
          field: 'name',
          tdClass: 'twitter-id',
        },
        {
          label: 'グループ',
          field: 'group',
          tdClass: 'group-name',
        },
        {
          label: 'TwitterID',
          field: 'twitterId',
          hidden: true,
        },
        {
          label: 'Twitter UID',
          field: 'uid',
          hidden: true,
          globalSearchDisabled: false,
        },
        {
          label: '',
          field: 'delete',
          tdClass: 'add-text',
          sortable: false,
        },
      ],
      rows: [],
      options: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '合計',
                },
              },
            },
          },
        },
        chart: {
          type: 'donut',
        },
        labels: [],
      },
      series: [],
      options_month: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '合計',
                },
              },
            },
          },
        },
        chart: {
          type: 'donut',
        },
        labels: [],
      },
      series_month: [],
      options_bar: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 0,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 2,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [],
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
        },
      },
      series_bar: [],
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
    this.windowWidth = window.innerWidth
    this.setPiChartsSize()
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const today = new Date()
      this.setYear = String(today.getFullYear())
      this.setMonth = String(today.getMonth() + 1).padStart(2, '0')
      const setMonth = 'm' + this.setYear + this.setMonth
      for (let i = 0; i < 6; i++) {
        const year = this.$dayjs().subtract(i, 'month').format('YYYY')
        const month = this.$dayjs().subtract(i, 'month').format('MM')
        this.options_bar.xaxis.categories.push(year + '/' + month)
      }

      this.querySnapshot = await getDocs(
        query(
          collection(db, 'users', userId, 'idol'),
          orderBy('instax_totalling.total', 'desc')
        )
      )
      let i = 0
      this.querySnapshot.forEach((doc) => {
        let instax
        if (doc.data().instax_totalling) {
          instax = doc.data().instax_totalling.total
        } else {
          instax = 0
        }
        this.rows.push({
          edit: '参照',
          number: instax,
          name: doc.data().name,
          group: doc.data().group,
          twitterId: doc.data().twitterId,
          uid: doc.id,
          delete: '削除',
        })

        if (
          doc.data().instax_totalling &&
          doc.data().instax_totalling.total !== 0
        ) {
          // Piグラフ 全期間
          this.options.labels.push(doc.data().name)
          this.series.push(doc.data().instax_totalling.total)
          // Piグラフ 月別
          if (typeof doc.data().instax_totalling[setMonth] !== 'undefined') {
            if (doc.data().instax_totalling[setMonth] !== 0) {
              this.options_month.labels.push(doc.data().name)
              this.series_month.push(doc.data().instax_totalling[setMonth])
            }
          }
          // 棒グラフ
          const data = []
          for (let i = 0; i < 6; i++) {
            const year = this.$dayjs().subtract(i, 'month').format('YYYY')
            const month = this.$dayjs().subtract(i, 'month').format('MM')
            const barMonth = 'm' + String(year + month)
            if (
              typeof doc.data().instax_totalling[barMonth] === 'undefined' ||
              doc.data().instax_totalling[barMonth] === 0
            ) {
              data.push(0)
            } else {
              data.push(doc.data().instax_totalling[barMonth])
            }
          }
          this.series_bar.push({ name: doc.data().name, data })
        }
        i += 1
      })
      this.created = true
    }, 0)
  },
  methods: {
    onCellClick(params) {
      if (params.column.field === 'name') {
        // Twitter ID
        const url = `https://twitter.com/${params.row.twitterId}`
        window.open(url, '_blank')
      } else if (params.column.field === 'group') {
        // グループ名
        if (params.row.group === '') {
          return
        }
        this.$router.push({
          path: '/group',
          query: { group: this.replaceParams(params.row.group) },
        })
      } else if (params.column.field === 'edit') {
        this.$router.push('/mypage/' + params.row.uid)
      } else if (params.column.field === 'delete') {
        this.confirmDelete(params)
      }
    },
    confirmDelete(params) {
      this.$buefy.dialog.confirm({
        title: 'アイドルの情報を削除します',
        message:
          '登録しているチェキの情報もすべて削除され、復元はできません。『' +
          params.row.name +
          '』の情報を本当に削除してもよろしいですか？',
        cancelText: 'キャンセル',
        confirmText: 'OK',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteIdol(params),
      })
    },
    confirmLogout() {
      this.$buefy.dialog.confirm({
        message: `ログアウトしても良いですか？`,
        cancelText: 'キャンセル',
        confirmText: 'OK',
        type: 'is-primary',
        onConfirm: () => this.$store.dispatch('auth/logout'),
      })
    },
    async deleteIdol(params) {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = params.row.uid
      await deleteDoc(doc(db, 'users', userId, 'idol', idolId))
      this.$buefy.dialog.alert({
        message: '『' + params.row.name + '』の情報を削除しました。',
        onConfirm: () => location.reload(),
      })
    },
    replaceParams(group) {
      if (group.includes('傾奇隊')) {
        return '傾奇隊'
      } else if (group.includes('仮面女子')) {
        return '仮面女子'
      } else if (group.includes('スリジエ：')) {
        return 'スリジエ東京'
      }
      return group
    },
    resizeWindow() {
      this.setPiChartsSize()
    },
    setPiChartsSize() {
      if (window.innerWidth < 1080) {
        this.piChartsWidth = window.innerWidth * 0.9
        this.piChartsHeight = window.innerWidth * 0.9
      } else {
        this.piChartsWidth = Math.min((window.innerWidth / 2) * 0.8, 650)
        this.piChartsHeight = Math.min((window.innerWidth / 2) * 0.8, 650)
      }
    },
    prevClick() {
      this.options_month.labels = []
      this.series_month = []
      if (this.setMonth === '01') {
        this.setMonth = '12'
        this.setYear = String(parseInt(this.setYear) - 1)
      } else {
        this.setMonth = String(parseInt(this.setMonth) - 1).padStart(2, '0')
      }
      this.garphRedraw()
    },
    nextClick() {
      this.options_month.labels = []
      this.series_month = []
      if (this.setMonth === '12') {
        this.setMonth = '01'
        this.setYear = String(parseInt(this.setYear) + 1)
      } else {
        this.setMonth = String(parseInt(this.setMonth) + 1).padStart(2, '0')
      }
      this.garphRedraw()
    },
    garphRedraw() {
      const labels = []
      const setMonth = 'm' + this.setYear + this.setMonth
      this.querySnapshot.forEach((doc) => {
        if (
          doc.data().instax_totalling &&
          doc.data().instax_totalling.total !== 0
        ) {
          if (typeof doc.data().instax_totalling[setMonth] !== 'undefined') {
            if (doc.data().instax_totalling[setMonth] !== 0) {
              labels.push(doc.data().name)
              this.series_month.push(doc.data().instax_totalling[setMonth])
            }
          }
        }
      })
      this.options_month = {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '合計',
                },
              },
            },
          },
        },
        chart: {
          type: 'donut',
        },
        labels,
      }
      this.series_month.length === 0
        ? (this.monthData = false)
        : (this.monthData = true)
    },
  },
}
</script>

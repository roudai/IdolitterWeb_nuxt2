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
      <div slot="emptystate">対象データがありません。</div>
    </vue-good-table>

    <div v-if="pageView === 'nonIdol'">
      <div class="notification is-danger is-light mt-3">
        【ガイダンス】<nuxt-link to="/idol">アイドル一覧</nuxt-link
        >の「登録」ボタンから、最初のアイドルを登録してください。アイドル一覧にいないアイドルは、
        下の「アイドル登録」から登録することができます。
      </div>
    </div>
    <div v-else-if="pageView === 'nonInstax'">
      <div class="notification is-danger is-light mt-3">
        登録したアイドルの「参照」⇒「追加」から、チェキの情報を登録してください。
      </div>
    </div>
    <div v-else>
      <div class="columns mt-3">
        <div class="column">
          <b-collapse class="card p-3">
            <apex-charts
              type="treemap"
              height="350"
              :options="options_tree"
              :series="series_tree"
            ></apex-charts>
          </b-collapse>
        </div>
        <div class="column">
          <b-collapse class="card p-3">
            <span class="icon" style="float: left" @click="prevClick">
              <svg viewBox="0 0 24 24">
                <path :d="mdiChevronDoubleLeft" />
              </svg>
            </span>
            <span style="float: left">{{ setYear }}年{{ setMonth }}月</span>
            <span class="icon" @click="nextClick">
              <svg viewBox="0 0 24 24">
                <path :d="mdiChevronDoubleRight" />
              </svg>
            </span>
            <div v-if="monthData">
              <apex-charts
                :options="options_month"
                :series="series_month"
                height="350"
              ></apex-charts>
            </div>
            <div v-else>対象月のデータがありません</div>
          </b-collapse>
        </div>
      </div>
      <div class="columns mt-3">
        <div class="column">
          <b-collapse class="card p-3">
            <span class="icon" style="float: left" @click="prevBarClick">
              <svg viewBox="0 0 24 24">
                <path :d="mdiChevronDoubleLeft" />
              </svg>
            </span>
            <span style="float: left"> 前 | 後 </span>
            <span class="icon" @click="nextBarClick">
              <svg viewBox="0 0 24 24">
                <path :d="mdiChevronDoubleRight" />
              </svg>
            </span>
            <apex-charts
              :options="options_bar"
              :series="series_bar"
              :height="350"
            ></apex-charts>
          </b-collapse>
        </div>
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
import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from '@mdi/js'

export default {
  data() {
    return {
      pageView: 'normal',
      monthData: true,
      mdiChevronDoubleLeft,
      mdiChevronDoubleRight,
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
      options_tree: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: 'treemap',
        },
        colors: [],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
          },
          formatter: function (text, op) {
            return [text, op.value]
          },
          offsetY: -4,
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
      series_tree: [
        {
          data: [],
        },
      ],
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
        colors: [],
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
        colors: [],
      },
      series_bar: [],
      select_colors: [
        '#5e108c',
        '#db7a51',
        '#edc568',
        '#d86436',
        '#0c619e',
        '#4ff7a6',
        '#db2335',
        '#ba9425',
        '#2e63b2',
        '#54b6d3',
        '#d66753',
        '#aeddef',
        '#fc4b5a',
        '#e298bd',
        '#9c17d1',
        '#ffdea5',
        '#ffc1d6',
        '#ffdfc1',
        '#f747e8',
        '#ef975d',
      ],
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
    this.windowWidth = window.innerWidth
    this.setPiChartsSize()
  },
  beforeCreate() {
    setTimeout(async () => {
      let allZero = true
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const setMonth = 'm' + this.$dayjs().format('YYYYMM')
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
      if (this.querySnapshot.empty) {
        this.pageView = 'nonIdol'
      }
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
          allZero = false
          // ツリーマップ
          this.series_tree[0].data.push({
            x: doc.data().name,
            y: doc.data().instax_totalling.total,
          })
          // Piグラフ
          if (typeof doc.data().instax_totalling[setMonth] !== 'undefined') {
            if (doc.data().instax_totalling[setMonth] !== 0) {
              this.options_month.labels.push(doc.data().name)
              this.series_month.push(doc.data().instax_totalling[setMonth])
            }
          }
          // 棒グラフ
          const data = []
          for (let i = 0; i < 6; i++) {
            const barMonth =
              'm' + this.options_bar.xaxis.categories[i].replace('/', '')
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
      })
      console.log(this.series_month)
      if (this.pageView === 'normal' && allZero) {
        this.pageView = 'nonInstax'
      }
      this.options_tree.colors = this.select_colors
      this.options_month.colors = this.select_colors
      this.options_bar.colors = this.select_colors
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
      this.piGarphRedraw()
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
      this.piGarphRedraw()
    },
    prevBarClick() {
      const shifted = this.options_bar.xaxis.categories.shift()
      const pushMonth = this.$dayjs(shifted).subtract(6, 'M').format('YYYY/MM')
      this.options_bar.xaxis.categories.push(pushMonth)
      this.barGraphRedraw()
    },
    nextBarClick() {
      const popped = this.options_bar.xaxis.categories.pop()
      const unshiftMonth = this.$dayjs(popped).add(6, 'M').format('YYYY/MM')
      this.options_bar.xaxis.categories.unshift(unshiftMonth)
      this.barGraphRedraw()
    },
    piGarphRedraw() {
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
      this.options_month.colors = this.select_colors
      this.series_month.length === 0
        ? (this.monthData = false)
        : (this.monthData = true)
    },
    barGraphRedraw() {
      this.series_bar = []
      this.querySnapshot.forEach((doc) => {
        const data = []
        for (let i = 0; i < 6; i++) {
          const barMonth =
            'm' + this.options_bar.xaxis.categories[i].replace('/', '')
          if (
            typeof doc.data().instax_totalling[barMonth] === 'undefined' ||
            doc.data().instax_totalling[barMonth] === 0
          ) {
            data.push(0)
          } else {
            data.push(doc.data().instax_totalling[barMonth])
          }
        }
        if (!(data[0] === 0 && data.every((value) => value === data[0]))) {
          this.series_bar.push({ name: doc.data().name, data })
        }
      })
      if (this.series_bar.length === 0) {
        this.series_bar.push({ name: '', data: [0, 0, 0, 0, 0, 0] })
      }
    },
  },
}
</script>

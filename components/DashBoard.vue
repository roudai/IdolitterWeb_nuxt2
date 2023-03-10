<template>
  <div v-if="created">
    <h4>{{ displayName }}</h4>
    <div v-show="view === ''">
      <vue-good-table
        ref="idol-table"
        :columns="columns"
        :rows="rows"
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

      <div class="buttons mt-3 has-text-right">
        <b-button
          type="is-primary is-light"
          @click="$router.push('/mypage/addnew')"
          >アイドル登録</b-button
        >
        <b-button
          type="is-primary is-light"
          @click="$router.push('/mypage/edit')"
          >ユーザー設定変更</b-button
        >
      </div>
    </div>

    <div v-if="pageView === 'nonIdol'">
      <div v-show="view === ''">
        <div class="notification is-danger is-light mt-3">
          <nuxt-link to="/idol">アイドル一覧</nuxt-link
          >の「登録」ボタンから、最初のアイドルを登録してください。アイドル一覧にいないアイドルは、
          上の「アイドル登録」から登録することができます。
        </div>
      </div>
    </div>
    <div v-else-if="pageView === 'nonInstax'">
      <div v-show="view === ''">
        <div class="notification is-danger is-light mt-3">
          登録したアイドルの「追加」から、チェキの情報を登録してください。
        </div>
      </div>
    </div>

    <div v-else>
      <div class="columns">
        <div class="column">
          <!-- ツリーマップ -->
          <b-collapse class="card p-3">
            <span>全期間マップ</span>
            <apex-charts
              type="treemap"
              height="400"
              :options="options_tree"
              :series="series_tree"
            ></apex-charts>
          </b-collapse>
        </div>
        <div class="column">
          <!-- 円グラフ -->
          <b-collapse class="card p-3">
            <span class="icon" style="float: left" @click="prevClick">
              <b-icon icon="chevron-double-left" />
            </span>
            <span style="float: left">{{ viewYear }}年{{ viewMonth }}月</span>
            <span class="icon" @click="nextClick">
              <b-icon icon="chevron-double-right" />
            </span>
            <apex-charts
              :options="options_pi"
              :series="series_pi"
              height="350"
            ></apex-charts>
          </b-collapse>
        </div>
      </div>
      <div class="columns mt-3">
        <!-- 棒グラフ -->
        <div class="column">
          <b-collapse class="card p-3">
            <span class="icon" style="float: left" @click="prevBarClick">
              <b-icon icon="chevron-double-left" />
            </span>
            <span style="float: left"> 前 | 後 </span>
            <span class="icon" @click="nextBarClick">
              <b-icon icon="chevron-double-right" />
            </span>
            <apex-charts
              :options="options_bar"
              :series="series_bar"
              :height="400"
            ></apex-charts>
          </b-collapse>
        </div>
      </div>
    </div>

    <div>
      <div>
        <div class="mt-3 has-text-right">
          <b-button
            label="ログアウトする"
            type="is-info"
            @click="confirmLogout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  query,
  orderBy,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore'

export default {
  props: {
    view: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      userData: null,
      userId: '',
      displayName: '',
      pageView: 'normal',
      monthData: true,
      created: false,
      querySnapshot: null,
      name: '',
      perPage: 10,
      perPageChangeFlag: false,
      totalPage: '',
      currentPage: '',
      windowWidth: '',
      viewYear: '',
      viewMonth: '',
      columns: [
        {
          label: '',
          field: 'edit',
          tdClass: 'add-text',
          sortable: false,
        },
        {
          label: '',
          field: 'add',
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
        chart: {
          offsetY: -3,
          offsetX: 0,
          type: 'treemap',
          toolbar: {
            show: false,
          },
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
      options_pi: {
        plotOptions: {
          pie: {
            customScale: 1.2,
            offsetY: 30,
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
        dataLabels: {
          style: {},
          dropShadow: {
            enabled: false,
          },
        },
        chart: {
          type: 'donut',
        },
        legend: {
          position: 'top',
          offsetX: 0,
        },
        colors: [],
        labels: [],
      },
      series_pi: [],
      options_bar: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
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
        dataLabels: {
          style: {},
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
          offsetX: 20,
        },
        colors: [],
      },
      series_bar: [],
    }
  },
  beforeCreate() {
    setTimeout(async () => {
      let allZero = true
      const db = getFirestore()

      // 公開用ダッシュボード
      if (this.view !== '') {
        const userList = await getDoc(doc(db, 'users', 'admin'))
        if (typeof userList.data().users[this.view] === 'undefined') {
          this.userId = 'none'
        } else {
          this.userId = userList.data().users[this.view]
        }
      } else {
        this.userId = this.$store.getters['auth/uid']
      }

      const userId = this.userId
      const setMonth = 'm' + this.$dayjs().format('YYYYMM')
      this.viewYear = this.$dayjs().format('YYYY')
      this.viewMonth = this.$dayjs().format('MM')
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
          add: '追加',
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
              this.options_pi.labels.push(doc.data().name)
              this.series_pi.push(doc.data().instax_totalling[setMonth])
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
      // Piグラフの並び替え
      this.piDataSort()

      if (this.series_pi.length === 0) {
        this.options_pi.noData = {
          text: 'データなし',
        }
      }
      if (this.pageView === 'normal' && allZero) {
        this.pageView = 'nonInstax'
      }
      // 色取得
      this.userData = await getDoc(doc(db, 'users', userId))
      this.displayName = this.userData.data().displayName
      this.options_tree.colors = this.userData.data().colors
      this.options_pi.colors = this.userData.data().colors
      this.options_bar.colors = this.userData.data().colors
      this.options_tree.dataLabels.style.colors = [
        this.userData.data().letter_color,
      ]
      this.options_pi.dataLabels.style.colors = [
        this.userData.data().letter_color,
      ]
      this.options_bar.dataLabels.style.colors = [
        this.userData.data().letter_color,
      ]

      this.created = true
    }, 0)
  },
  methods: {
    onCellClick(params) {
      if (params.column.field === 'name') {
        if (params.row.twitterId === '') {
          return
        }
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
      } else if (params.column.field === 'add') {
        this.$router.push('/mypage/add/' + params.row.uid)
      } else if (params.column.field === 'delete') {
        this.confirmDelete(params)
      }
    },
    confirmDelete(params) {
      if (!isNaN(params.row.uid)) {
        // 一覧からの登録の場合
        this.$buefy.dialog.confirm({
          title: 'アイドルの情報を削除します',
          message:
            '『' +
            params.row.name +
            '』を削除してもよろしいですか？チェキのデータは残るため、再登録で復元します。',
          cancelText: 'キャンセル',
          confirmText: 'OK',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteIdol(params),
        })
      } else {
        // 手動登録の場合
        this.$buefy.dialog.confirm({
          title: 'アイドルの情報を削除します',
          message:
            '『' +
            params.row.name +
            '』を削除してもよろしいですか？手動登録したアイドルは、チェキのデータを復元することはできません。',
          cancelText: 'キャンセル',
          confirmText: 'OK',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteIdol(params),
        })
      }
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
      const userId = this.userId
      const idolId = params.row.uid
      await updateDoc(doc(db, 'users', userId), {
        idol_list: arrayRemove(idolId),
      })
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
    piDataSort() {
      const piData = []
      for (let i = 0; i < this.options_pi.labels.length; i++) {
        piData.push({
          key: this.options_pi.labels[i],
          value: this.series_pi[i],
        })
      }
      piData.sort((a, b) => b.value - a.value)
      this.options_pi.labels = []
      this.series_pi = []
      piData.forEach((element) => this.options_pi.labels.push(element.key))
      piData.forEach((element) => this.series_pi.push(element.value))
    },
    prevClick() {
      this.options_pi.labels = []
      this.series_pi = []
      if (this.viewMonth === '01') {
        this.viewMonth = '12'
        this.viewYear = String(parseInt(this.viewYear) - 1)
      } else {
        this.viewMonth = String(parseInt(this.viewMonth) - 1).padStart(2, '0')
      }
      this.piGarphRedraw()
    },
    nextClick() {
      this.options_pi.labels = []
      this.series_pi = []
      if (this.viewMonth === '12') {
        this.viewMonth = '01'
        this.viewYear = String(parseInt(this.viewYear) + 1)
      } else {
        this.viewMonth = String(parseInt(this.viewMonth) + 1).padStart(2, '0')
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
      this.options_pi.labels = []
      const setMonth = 'm' + this.viewYear + this.viewMonth
      this.querySnapshot.forEach((doc) => {
        if (
          doc.data().instax_totalling &&
          doc.data().instax_totalling.total !== 0
        ) {
          if (typeof doc.data().instax_totalling[setMonth] !== 'undefined') {
            if (doc.data().instax_totalling[setMonth] !== 0) {
              this.options_pi.labels.push(doc.data().name)
              this.series_pi.push(doc.data().instax_totalling[setMonth])
            }
          }
        }
      })
      this.piDataSort()
      this.options_pi = {
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
        labels: this.options_pi.labels,
      }
      if (this.series_pi.length === 0) {
        this.options_pi.noData = {
          text: 'データなし',
        }
      }
      this.options_pi.colors = this.userData.data().colors
      this.series_pi.length === 0
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

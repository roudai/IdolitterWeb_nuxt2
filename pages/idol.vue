<template>
  <div v-if="created">
    <h5>アイドル一覧</h5>
    <button class="button mb-2" @click="randomView">ランダム表示</button>
    <button
      v-show="windowWidth <= 576"
      class="button mb-2"
      @click="compactModeChange"
    >
      表示切替
    </button>
    <button class="button mb-2" @click="clearSearch">検索クリア</button>
    <vue-good-table
      ref="idol-table"
      :columns="columns"
      :rows="rows"
      :compact-mode="compactMode"
      :pagination-options="{
        enabled: true,
        perPage: perPage,
        setCurrentPage: currentPage,
        perPageDropdown: [10, 20, 50, 100],
        dropdownAllowAll: false,
        jumpFirstOrLast: true,
        firstLabel: '',
        lastLabel: '',
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
      @on-per-page-change="onPerPageChange"
    />
    <a8-idol-under></a8-idol-under>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export default {
  async asyncData({ $axios, $config }) {
    const baseUrl = $axios.defaults.baseURL + 'アイドル一覧?'
    const params = { key: $config.apiKey }
    const queryParams = new URLSearchParams(params)
    const response = await $axios.$get(baseUrl + queryParams)
    return response
  },
  data() {
    return {
      created: false,
      perPage: 10,
      perPageChangeFlag: false,
      totalPage: '',
      currentPage: '',
      windowWidth: '',
      compactMode: false,
      columns: [
        {
          label: 'グループ',
          field: 'group',
          tdClass: 'group-name',
        },
        {
          label: '名前',
          field: 'name',
        },
        {
          label: '読み',
          field: 'yomi',
        },
        {
          label: 'TwitterID',
          field: 'twitterId',
          tdClass: 'twitter-id',
        },
        {
          label: 'フォロワー',
          field: 'follower',
          type: 'number',
          firstSortType: 'desc',
        },
        {
          label: 'ツイート',
          field: 'tweet',
          type: 'number',
          firstSortType: 'desc',
        },
        {
          label: '卒業解散予定',
          field: this.deleteFn,
          firstSortType: 'desc',
        },
        {
          label: '検索用',
          field: 'forSearch',
          hidden: true,
        },
        {
          label: 'Twitter UID',
          field: 'uid',
          hidden: true,
          globalSearchDisabled: false,
        },
      ],
      rows: [],
    }
  },
  mounted() {
    this.$refs['idol-table'].globalSearchTerm = this.$route.query.group
    window.addEventListener('resize', this.resizeWindow)
    this.windowWidth = window.innerWidth
    window.innerHeight < 1080 ? (this.perPage = 10) : (this.perPage = 20)
  },
  created() {
    this.totalPage = Math.ceil(this.$data.values.length / this.perPage)
    this.currentPage = Math.floor(Math.random() * this.totalPage) + 1
    let firstFlag = true
    let addText = '登録'
    for (const idol of this.$data.values) {
      if (firstFlag) {
        firstFlag = false
        continue
      }
      if (typeof idol[11] === 'undefined') addText = ''
      this.rows.push({
        add: addText,
        group: idol[0],
        twitterId: idol[5],
        name: idol[1] + ' ' + idol[2],
        yomi: idol[3] + ' ' + idol[4],
        follower: parseInt(idol[7]),
        tweet: parseInt(idol[8]),
        delete: idol[14],
        forSearch: this.setForSearch(idol),
        uid: idol[11],
      })
      if (addText === '') addText = '登録'
    }
    setTimeout(() => {
      if (this.$store.getters['auth/isLoggedIn']) {
        this.columns.unshift({
          label: '',
          field: 'add',
          tdClass: 'add-text',
          sortable: false,
        })
      }
    }, 0)
    this.created = true
  },
  methods: {
    compactModeChange() {
      this.compactMode = !this.compactMode
    },
    async onCellClick(params) {
      if (params.column.field === 'twitterId') {
        // Twitter ID
        const url = 'https://twitter.com/' + params.row.twitterId
        window.open(url, '_blank')
      } else if (params.column.field === 'group') {
        // グループ名
        this.$router.push({
          path: '/group',
          query: { group: this.replaceParams(params.row.group) },
        })
      } else if (params.column.field === 'add') {
        // 登録ボタン
        if (params.row.add === '') {
          return
        }
        const db = getFirestore()
        const userId = this.$store.getters['auth/uid']
        const idolId = params.row.uid
        // チェキデータ集計結果の復元
        const instaxTotalling = []
        const querySnapshot = await getDocs(
          collection(db, 'users', userId, 'idol', idolId, 'instax')
        )
        querySnapshot.forEach((doc) => {
          isNaN(instaxTotalling.total)
            ? (instaxTotalling.total = doc.data().number)
            : (instaxTotalling.total += doc.data().number)
          const setMonth =
            'm' + this.$dayjs(doc.data().date.toDate()).format('YYYYMM')
          isNaN(instaxTotalling[setMonth])
            ? (instaxTotalling[setMonth] = doc.data().number)
            : (instaxTotalling[setMonth] += doc.data().number)
        })
        if (!Object.keys(instaxTotalling).length) instaxTotalling.total = 0
        await setDoc(doc(db, 'users', userId, 'idol', idolId), {
          name: params.row.name,
          group: params.row.group,
          twitterId: params.row.twitterId,
          instax_totalling: {
            total: instaxTotalling.total,
          },
        })
        for (const key in instaxTotalling) {
          if (key !== 'total') {
            const setMonthPath = 'instax_totalling.' + key
            await updateDoc(doc(db, 'users', userId, 'idol', idolId), {
              [setMonthPath]: instaxTotalling[key],
            })
          }
        }
        this.$router.push('/mypage')
      }
    },
    onPerPageChange(params) {
      this.perPage = params.currentPerPage
      this.perPageChangeFlag = !this.perPageChangeFlag
      this.totalPage = params.total
      if (this.perPageChangeFlag) {
        this.currentPage = Math.floor(Math.random() * this.totalPage + 1) + 1
      }
    },
    randomView() {
      this.currentPage = Math.floor(Math.random() * this.totalPage + 1) + 1
    },
    clearSearch() {
      this.$refs['idol-table'].globalSearchTerm = ''
    },
    deleteFn(rowObj) {
      return !rowObj.delete ? '-' : rowObj.delete
    },
    resizeWindow() {
      this.windowWidth = window.innerWidth
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
    setForSearch(idol) {
      let forSearch = ''
      forSearch = idol[1] + idol[2]
      forSearch += ' ' + idol[3] + idol[4]
      forSearch += ' @' + idol[5]
      forSearch += ' ' + idol[0].replace(/\s+/g, '')
      return forSearch
    },
  },
}
</script>

<style>
.vgt-wrap__footer .footer__navigation > button:first-of-type {
  margin-right: 0px;
}

.vgt-wrap__footer .footer__navigation__page-btn {
  margin-left: 0px;
  padding: 0px;
}
</style>

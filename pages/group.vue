<template>
  <div v-if="created">
    <h5>グループ一覧</h5>
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
      ref="group-table"
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
    <div class="mt-3">
      <button
        class="button"
        style="color: #ffffff; background-color: #1da1f2"
        @click="linkTweet"
      >
        <b-icon icon="twitter" />
        <span>ツイート</span>
      </button>
    </div>
    <a8-group-under></a8-group-under>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    try {
      const baseUrl = $axios.defaults.baseURL + 'グループ一覧?'
      const params = { key: $config.apiKey }
      const queryParams = new URLSearchParams(params)
      const response = await $axios.$get(encodeURI(baseUrl) + queryParams)
      return response
    } catch (err) {
      console.log(err.response.status)
      console.log(err.response.data.message)
    }
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
          label: '認証',
          field: this.certifFn,
          firstSortType: 'desc',
        },
        {
          label: '解散休止予定',
          field: this.deleteFn,
          firstSortType: 'desc',
        },
      ],
      rows: [],
    }
  },
  mounted() {
    this.$refs['group-table'].globalSearchTerm = this.$route.query.group
    window.addEventListener('resize', this.resizeWindow)
    this.windowWidth = window.innerWidth
    window.innerHeight < 1080 ? (this.perPage = 10) : (this.perPage = 20)
  },
  created() {
    this.totalPage = Math.ceil(this.$data.values.length / this.perPage)
    this.currentPage = Math.floor(Math.random() * this.totalPage) + 1
    let firstFlag = true
    for (const idol of this.$data.values) {
      if (firstFlag) {
        firstFlag = false
        continue
      }
      this.rows.push({
        group: idol[0],
        twitterId: idol[5],
        follower: parseInt(idol[7]),
        tweet: parseInt(idol[8]),
        certif: idol[9],
        delete: idol[14],
      })
    }
    this.created = true
  },
  methods: {
    compactModeChange() {
      this.compactMode = !this.compactMode
    },
    onCellClick(params) {
      if (params.column.field === 'twitterId') {
        const url = 'https://twitter.com/' + params.row.twitterId
        window.open(url, '_blank')
      } else if (params.column.field === 'group') {
        this.$router.push({
          path: '/idol',
          query: { group: this.replaceParams(params.row.group) },
        })
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
      this.$refs['group-table'].globalSearchTerm = ''
    },
    certifFn(rowObj) {
      return !rowObj.certif ? '-' : rowObj.certif
    },
    deleteFn(rowObj) {
      return !rowObj.delete ? '-' : rowObj.delete
    },
    resizeWindow() {
      this.windowWidth = window.innerWidth
    },
    replaceParams(group) {
      if (group.includes('スリジエ東京')) {
        return 'スリジエ：'
      }
      return group
    },
    linkTweet() {
      const url = new URL('https://twitter.com/intent/tweet')
      url.searchParams.append('text', 'グループ一覧')
      url.searchParams.append('url', 'https://idolitter.net/group')
      url.searchParams.append('hashtags', 'アイドリッター')
      window.open(url, '_blank')
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

<template>
  <div>
    <button
      v-show="windowWidth <= 576"
      class="button mb-2"
      @click="compactModeChange"
    >
      表示変更
    </button>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :compact-mode="compactMode"
      :pagination-options="{
        enabled: true,
        perPage: 20,
        perPageDropdown: [10, 20, 50, 100],
        dropdownAllowAll: false,
        nextLabel: '次へ',
        prevLabel: '前へ',
        rowsPerPageLabel: '表示数',
        infoFn: (params) =>
          `${params.currentPage} / ${params.totalPage} ページ`,
      }"
      :search-options="{
        enabled: true,
        skipDiacritics: true,
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
    />
  </div>
</template>

<script>
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
      windowWidth: '',
      compactMode: false,
      columns: [
        {
          label: 'グループ',
          field: 'group',
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
        },
        {
          label: 'ツイート',
          field: 'tweet',
          type: 'number',
        },
      ],
      rows: [],
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
  },
  created() {
    let firstFlag = true
    for (const idol of this.$data.values) {
      if (firstFlag) {
        firstFlag = false
        continue
      }
      this.rows.push({
        group: idol[0],
        twitterId: idol[5],
        name: idol[1] + ' ' + idol[2],
        yomi: idol[3] + ' ' + idol[4],
        follower: parseInt(idol[7]),
        tweet: parseInt(idol[8]),
      })
    }
  },
  methods: {
    compactModeChange() {
      this.compactMode = !this.compactMode
    },
    onCellClick(params) {
      if (params.column.field === 'twitterId') {
        const url = 'https://twitter.com/' + params.row.twitterId
        window.open(url, '_blank')
      }
    },
    resizeWindow() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<style>
.twitter-id {
  text-decoration: underline;
  cursor: pointer;
}

table {
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  display: table;
}
</style>

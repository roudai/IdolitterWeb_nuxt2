<template>
  <div>
    <button
      v-show="windowWidth <= 576"
      class="button mb-2"
      @click="compactModeChange"
    >
      表示切替
    </button>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :compact-mode="compactMode"
      :sort-options="{
        enabled: false,
      }"
      :pagination-options="{
        enabled: true,
        perPage: 10,
        setCurrentPage: 1,
        perPageDropdownEnabled: false,
        nextLabel: '次',
        prevLabel: '前',
        rowsPerPageLabel: '表示数',
        infoFn: (params) => `${params.currentPage} / ${params.totalPage}`,
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    const baseUrl = $axios.defaults.baseURL + '取得差分?'
    const params = {
      key: $config.apiKey,
      range: '取得差分!I2:N100',
    }
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
          label: '順位',
          field: 'rank',
          type: 'number',
        },
        {
          label: 'グループ',
          field: 'group',
        },
        {
          label: 'TwitterID',
          field: 'twitterId',
          tdClass: 'twitter-id',
        },
        {
          label: 'TwitterName',
          field: 'name',
        },
        {
          label: '前フォロワー数',
          field: 'oldFollower',
          type: 'number',
        },
        {
          label: '後フォロワー数',
          field: 'newFollower',
          type: 'number',
        },
        {
          label: 'フォロワー増減',
          field: 'increase',
          type: 'number',
        },
      ],
      rows: [],
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
    this.windowWidth = window.innerWidth
    window.innerHeight < 1080 ? (this.perPage = 10) : (this.perPage = 20)
  },
  created() {
    let rank = 1
    for (const idol of this.$data.values) {
      const oldFollower = idol[3]
      const newFollower = idol[4]
      if (oldFollower === 0 || newFollower / oldFollower >= 3) {
        continue
      }

      this.rows.push({
        rank,
        group: idol[0],
        twitterId: idol[1],
        name: idol[2],
        oldFollower,
        newFollower,
        increase: idol[5],
      })
      rank += 1
    }
  },
  methods: {
    compactModeChange() {
      this.compactMode = !this.compactMode
    },
    onCellClick(params) {
      if (params.column.tdClass === 'twitter-id') {
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

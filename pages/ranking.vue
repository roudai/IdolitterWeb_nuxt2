<template>
  <div>
    <h5>
      <p v-text="$dayjs().subtract(1, 'day').format('YYYY年M月D日（dd）')" />
    </h5>
    <h5>フォロワー数増ランキング</h5>
    <vue-good-table
      :columns="columns_follower"
      :rows="rows_follower"
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
    <h5 class="mt-5">ツイート数増ランキング</h5>
    <vue-good-table
      :columns="columns_tweet"
      :rows="rows_tweet"
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
    const params1 = {
      key: $config.apiKey,
      range: '取得差分!I2:N301',
    }
    const queryParams1 = new URLSearchParams(params1)
    const response1 = await $axios.$get(baseUrl + queryParams1)

    const params2 = {
      key: $config.apiKey,
      range: '取得差分!P2:U301',
    }
    const queryParams2 = new URLSearchParams(params2)
    const response2 = await $axios.$get(baseUrl + queryParams2)

    return { follower: response1, tweet: response2 }
  },
  data() {
    return {
      windowWidth: '',
      columns_follower: [
        {
          label: '順位',
          field: 'rank',
          type: 'number',
        },
        {
          label: 'TwitterName',
          field: 'name',
        },
        {
          label: 'TwitterID',
          field: 'twitterId',
          tdClass: 'twitter-id',
        },
        {
          label: 'グループ',
          field: 'group',
        },
        {
          label: '前フォロワー数',
          field: 'oldNum',
          type: 'number',
        },
        {
          label: '後フォロワー数',
          field: 'newNum',
          type: 'number',
        },
        {
          label: 'フォロワー増減',
          field: 'increase',
          type: 'number',
        },
      ],
      rows_follower: [],
      columns_tweet: [
        {
          label: '順位',
          field: 'rank',
          type: 'number',
        },
        {
          label: 'TwitterName',
          field: 'name',
        },
        {
          label: 'TwitterID',
          field: 'twitterId',
          tdClass: 'twitter-id',
        },
        {
          label: 'グループ',
          field: 'group',
        },
        {
          label: '前ツイート数',
          field: 'oldNum',
          type: 'number',
        },
        {
          label: '後ツイート数',
          field: 'newNum',
          type: 'number',
        },
        {
          label: 'ツイート増減',
          field: 'increase',
          type: 'number',
        },
      ],
      rows_tweet: [],
    }
  },
  created() {
    this.createRank(this.$data.follower.values, 'follower')
    this.createRank(this.$data.tweet.values, 'tweet')
  },
  methods: {
    createRank(rankData, type) {
      const rows = []
      let rank = 1
      let rankup = 0
      for (let i = 0; i < rankData.length; i++) {
        if (rank > 100) {
          break
        }

        const oldNum = rankData[i][3]
        const newNum = rankData[i][4]
        if (oldNum === 0 || newNum / oldNum >= 3) {
          continue
        }

        rows.push({
          rank,
          group: rankData[i][0],
          twitterId: rankData[i][1],
          name: rankData[i][2],
          oldNum,
          newNum,
          increase: rankData[i][5],
        })

        if (rankData[i][5] === rankData[i + 1][5]) {
          rankup = rankup + 1
        } else {
          rank = rank + rankup + 1
          rankup = 0
        }
      }

      if (type === 'follower') {
        this.rows_follower = rows
      } else if (type === 'tweet') {
        this.rows_tweet = rows
      }
    },
    compactModeChange() {
      this.compactMode = !this.compactMode
    },
    onCellClick(params) {
      if (params.column.tdClass === 'twitter-id') {
        const url = 'https://twitter.com/' + params.row.twitterId
        window.open(url, '_blank')
      }
    },
  },
}
</script>

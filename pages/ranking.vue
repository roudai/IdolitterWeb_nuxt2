<template>
  <div v-if="created">
    <div v-if="process === '集計中'" class="is-size-5 has-text-weight-semibold">
      現在ランキング集計中です。
    </div>
    <div
      v-else-if="process === '失敗'"
      class="is-size-5 has-text-weight-semibold"
    >
      不具合のため、
      <span v-text="$dayjs().subtract(1, 'day').format('YYYY年M月D日（dd）')" />
      のランキングはありません。
    </div>
    <div v-else>
      <h5>
        <p v-text="$dayjs().subtract(1, 'day').format('YYYY年M月D日（dd）')" />
      </h5>
      <h5>フォロワー増加数ランキング</h5>
      <vue-good-table
        ref="ranking-table"
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
      <a8-ranking-middle></a8-ranking-middle>
      <h5 class="mt-5">ツイート数ランキング</h5>
      <vue-good-table
        ref="ranking-table"
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
    <a8-ranking-under></a8-ranking-under>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    const baseUrl = $axios.defaults.baseURL + '取得差分?'
    const params0 = {
      key: $config.apiKey,
      range: '取得差分!W1',
    }
    const queryParams0 = new URLSearchParams(params0)
    const response0 = await $axios.$get(encodeURI(baseUrl) + queryParams0)

    const params1 = {
      key: $config.apiKey,
      range: '取得差分!I2:N301',
    }
    const queryParams1 = new URLSearchParams(params1)
    const response1 = await $axios.$get(encodeURI(baseUrl) + queryParams1)

    const params2 = {
      key: $config.apiKey,
      range: '取得差分!P2:U301',
    }
    const queryParams2 = new URLSearchParams(params2)
    const response2 = await $axios.$get(encodeURI(baseUrl) + queryParams2)

    return { process: response0, follower: response1, tweet: response2 }
  },
  data() {
    return {
      created: false,
      process: '',
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
          tdClass: 'group-name',
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
          tdClass: 'group-name',
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
    this.process = this.$data.process.values[0][0]
    this.createRank(this.$data.follower.values, 'follower')
    this.createRank(this.$data.tweet.values, 'tweet')
    this.created = true
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
      } else if (params.column.field === 'group') {
        this.$router.push({
          path: '/group',
          query: { group: this.replaceParams(params.row.group) },
        })
      }
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
  },
}
</script>

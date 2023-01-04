<template>
  <div>
    <section class="section">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        compact-mode
        :pagination-options="{
          enabled: true,
          mode: 'pages',
          perPage: 20,
          perPageDropdown: [10, 20, 50, 100],
          dropdownAllowAll: false,
        }"
        :search-options="{
          enabled: true,
        }"
        @on-cell-click="onCellClick"
      />
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const baseUrl =
      'https://sheets.googleapis.com/v4/spreadsheets/1U6dXI2B5EOI8f8h2t20BIVbIznLbNtDegNwHHODda_8/values/' +
      'アイドル一覧?'
    const params = { key: 'AIzaSyBQEWQ-vMAmzRi2tmnRP2po7UL78NCI7qc' }
    const queryParams = new URLSearchParams(params)
    const response = await $axios.$get(baseUrl + queryParams)
    return response
  },
  data() {
    return {
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
    onCellClick(params) {
      if (params.column.field === 'twitterId') {
        const url = 'https://twitter.com/' + params.row.twitterId
        window.open(url, '_blank')
      }
    },
  },
}
</script>

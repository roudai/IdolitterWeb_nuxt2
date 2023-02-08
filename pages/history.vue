<template>
  <div v-if="created">
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
      :pagination-options="{
        enabled: true,
        perPage: perPage,
        setCurrentPage: 1,
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
      :sort-options="{
        enabled: false,
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
    />
    <a8-history-under></a8-history-under>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    const baseUrl = $axios.defaults.baseURL + '履歴?'
    const params = { key: $config.apiKey }
    const queryParams = new URLSearchParams(params)
    const response = await $axios.$get(encodeURI(baseUrl) + queryParams)
    return response
  },
  data() {
    return {
      created: false,
      perPage: 10,
      windowWidth: '',
      compactMode: false,
      columns: [
        {
          label: 'グループ',
          field: 'group',
        },
        {
          label: '旧TwitterID',
          field: 'oldId',
        },
        {
          label: '新TwitterID',
          field: this.newIdFn,
          tdClass: 'twitter-id',
        },
        {
          label: '名前',
          field: 'name',
        },
        {
          label: '卒業解散予定',
          field: this.deleteFn,
        },
        {
          label: '内容',
          field: 'content',
        },
        {
          label: '実行日時',
          field: 'execution',
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
    let firstFlag = true
    for (const idol of this.$data.values) {
      if (firstFlag) {
        firstFlag = false
        continue
      }
      this.rows.push({
        group: idol[0],
        oldId: idol[1],
        newId: idol[2],
        name: idol[3],
        delete: idol[4],
        content: idol[5],
        execution: idol[6],
      })
    }
    this.created = true
  },
  methods: {
    compactModeChange() {
      this.compactMode = !this.compactMode
    },
    onCellClick(params) {
      if (params.column.tdClass === 'twitter-id' && params.row.newId !== '') {
        const url = 'https://twitter.com/' + params.row.newId
        window.open(url, '_blank')
      }
    },
    newIdFn(rowObj) {
      return !rowObj.newId ? '-' : rowObj.newId
    },
    deleteFn(rowObj) {
      return !rowObj.delete ? '-' : rowObj.delete
    },
    resizeWindow() {
      this.windowWidth = window.innerWidth
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

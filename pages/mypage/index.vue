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
    />

    <apex-charts
      :options="options"
      :series="series"
      :labels="labels"
      :width="piChartsWidth"
      :height="piChartsHeight"
    ></apex-charts>

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

export default {
  data() {
    return {
      created: false,
      name: '',
      perPage: 10,
      perPageChangeFlag: false,
      totalPage: '',
      currentPage: '',
      windowWidth: '',
      piChartsWidth: 0,
      piChartsHeight: 0,
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
      options: {
        chart: {
          type: 'donut',
        },
        labels: [],
      },
      series: [],
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeWindow)
    this.windowWidth = window.innerWidth
    this.setPiChartsSize()
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users', userId, 'idol'),
          orderBy('instax_totalling.total', 'desc')
        )
      )
      querySnapshot.forEach((doc) => {
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
          this.options.labels.push(doc.data().name)
          this.series.push(doc.data().instax_totalling.total)
        }
      })

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
        this.piChartsWidth = window.innerWidth
        this.piChartsHeight = window.innerWidth
      } else {
        this.piChartsWidth = window.innerWidth / 2
        this.piChartsHeight = window.innerWidth / 2
      }
      console.log(this.piChartsWidth, this.piChartsHeight)
    },
  },
}
</script>

<style></style>

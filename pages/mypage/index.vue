<template>
  <div>
    <h5>マイページ</h5>
    <div>{{ name }}</div>
    <vue-good-table
      ref="idol-table"
      :columns="columns"
      :rows="rows"
      :compact-mode="compactMode"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'group', type: 'name' },
      }"
      :pagination-options="{
        enabled: true,
        perPage: perPage,
        setCurrentPage: currentPage,
        perPageDropdown: [5, 10, 30],
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
    />
    <div class="buttons mt-3">
      <b-button type="is-primary is-light" @click="$router.push('/mypage/add')"
        >アイドル登録</b-button
      >
      <b-button label="ログアウトする" type="is-info" @click="confirmLogout" />
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore'

export default {
  data() {
    return {
      name: '',
      perPage: 10,
      perPageChangeFlag: false,
      totalPage: '',
      currentPage: '',
      windowWidth: '',
      compactMode: false,
      columns: [
        {
          label: '',
          field: 'add',
          tdClass: 'add-text',
          sortable: false,
        },
        {
          label: '',
          field: 'edit',
          tdClass: 'add-text',
          sortable: false,
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
    }
  },
  created() {
    setTimeout(async () => {
      this.name = this.$store.getters['auth/displayName']

      const db = getFirestore()
      const document = 'users/' + this.$store.getters['auth/uid'] + '/idol'
      const q = query(collection(db, document))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.rows.push({
          add: '追加',
          edit: '参照',
          name: doc.data().name,
          group: doc.data().group,
          twitterId: doc.data().twitterId,
          uid: doc.id,
          delete: '削除',
        })
      })
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
      } else if (params.column.field === 'add') {
        this.$router.push('/mypage/add/' + params.row.uid)
      } else if (params.column.field === 'edit') {
        this.$router.push('/mypage/edit')
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
        type: 'is-primary',
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
      const collectPath = 'users/' + this.$store.getters['auth/uid'] + '/idol'
      await deleteDoc(doc(db, collectPath, params.row.uid))
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
  },
}
</script>

<style></style>

<template>
  <div>
    <h3>{{ name }}</h3>
    <h4>{{ group }}</h4>

    <vue-good-table
      ref="idol-table"
      :columns="columns"
      :rows="rows"
      :compact-mode="compactMode"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'date', type: 'desc' },
      }"
      :pagination-options="{
        enabled: true,
        perPage: perPage,
        setCurrentPage: currentPage,
        perPageDropdown: [5, 10, 30, 100],
        dropdownAllowAll: false,
        nextLabel: '次',
        prevLabel: '前',
        rowsPerPageLabel: '表示数',
        infoFn: (params) => `${params.currentPage} / ${params.totalPage}`,
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
    />
    <div class="buttons mt-3">
      <b-button type="is-link is-light" @click="$router.go(-1)">戻る</b-button>
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
  getDoc,
  deleteDoc,
} from 'firebase/firestore'

export default {
  data() {
    return {
      show: true,
      name: '',
      group: '',
      perPage: 10,
      perPageChangeFlag: false,
      totalPage: '',
      currentPage: '',
      windowWidth: '',
      compactMode: false,
      columns: [
        {
          label: '',
          field: 'edit',
          tdClass: 'add-text',
          sortable: false,
        },
        {
          label: '',
          field: 'delete',
          tdClass: 'add-text',
          sortable: false,
        },
        {
          label: '日付',
          field: 'date',
        },
        {
          label: '枚数',
          field: 'number',
        },
        {
          label: 'URL',
          field: 'url',
          tdClass: 'add-text',
          sortable: false,
        },
        {
          label: 'Document ID',
          field: 'docId',
          hidden: true,
          globalSearchDisabled: false,
        },
      ],
      rows: [],
    }
  },
  created() {
    setTimeout(async () => {
      const db = getFirestore()
      const collectPath = 'users/' + this.$store.getters['auth/uid'] + '/idol/'
      const document = this.$route.params.uid
      const docRef = doc(db, collectPath, document)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.group = docSnap.data().group
        this.name = docSnap.data().name
      } else {
        this.show = false
      }

      const collectPath2 =
        'users/' +
        this.$store.getters['auth/uid'] +
        '/idol/' +
        this.$route.params.uid +
        '/instax'
      const q = query(collection(db, collectPath2))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.rows.push({
          edit: '編集',
          delete: '削除',
          date: this.$dayjs(doc.data().date.toDate()).format('YYYY/MM/DD'),
          number: doc.data().number,
          url: doc.data().url,
          docId: doc.id,
        })
      })
    }, 0)
  },
  methods: {
    onCellClick(params) {
      if (params.column.field === 'url') {
        window.open(params.row.url, '_blank')
      } else if (params.column.field === 'edit') {
        this.$router.push('/mypage/' + params.row.uid)
      } else if (params.column.field === 'delete') {
        this.$buefy.dialog.confirm({
          title: 'チェキの情報を削除します',
          message: '情報の復元はできません。削除しても良いですか？',
          cancelText: 'キャンセル',
          confirmText: 'OK',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteInstax(params),
        })
      }
    },
    async deleteInstax(params) {
      const db = getFirestore()
      const collectPath =
        'users/' +
        this.$store.getters['auth/uid'] +
        '/idol/' +
        this.$route.params.uid +
        '/instax'
      await deleteDoc(doc(db, collectPath, params.row.docId))
      this.$buefy.dialog.alert({
        message: '削除しました。',
        onConfirm: () => location.reload(),
      })
    },
  },
}
</script>

<style></style>

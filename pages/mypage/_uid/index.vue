<template>
  <div v-if="created">
    <div v-if="profileShow">
      <h3>{{ name }}</h3>
      <h4>{{ group }}</h4>
      <div class="buttons mt-3 mb-3">
        <b-button type="is-link is-light" @click="clickEdit">編集</b-button>
      </div>
    </div>
    <div v-else>
      <b-field>
        <b-input v-model="name" expanded></b-input>
        <b-input v-model="twitterId" expanded></b-input>
      </b-field>
      <b-field>
        <b-input v-model="group"></b-input>
      </b-field>
      <div class="buttons mt-3 mb-3">
        <b-button type="is-link is-light" @click="clickUpdate">更新</b-button>
      </div>
    </div>

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
      <b-button type="is-link is-light" @click="$router.push('/mypage')"
        >戻る</b-button
      >
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore'

export default {
  data() {
    return {
      created: false,
      show: true,
      profileShow: true,
      name: '',
      group: '',
      twitterId: '',
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
          label: '日付',
          field: 'date',
        },
        {
          label: '枚数',
          field: 'number',
          type: 'number',
        },
        {
          label: '会場名',
          field: 'place',
        },
        {
          label: 'イベント名',
          field: 'event',
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
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      const docSnap = await getDoc(doc(db, 'users', userId, 'idol', idolId))
      if (docSnap.exists()) {
        this.group = docSnap.data().group
        this.name = docSnap.data().name
        this.twitterId = docSnap.data().twitterId
      } else {
        this.show = false
      }

      const querySnapshot = await getDocs(
        collection(db, 'users', userId, 'idol', idolId, 'instax')
      )
      querySnapshot.forEach((doc) => {
        this.rows.push({
          edit: '編集',
          date: this.$dayjs(doc.data().date.toDate()).format('YYYY/MM/DD'),
          number: doc.data().number,
          url: doc.data().url,
          place: doc.data().place,
          event: doc.data().event,
          docId: doc.id,
        })
      })
      this.created = true
    }, 0)
  },
  methods: {
    onCellClick(params) {
      if (params.column.field === 'url') {
        if (params.row.url !== '') window.open(params.row.url, '_blank')
      } else if (params.column.field === 'edit') {
        this.$router.push(
          '/mypage/' + this.$route.params.uid + '/' + params.row.docId
        )
      }
    },
    clickEdit() {
      this.profileShow = false
    },
    async clickUpdate() {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      await setDoc(doc(db, 'users', userId, 'idol', idolId), {
        name: this.name,
        group: this.group,
        twitterId: this.twitterId,
      })
      this.profileShow = true
    },
    async deleteInstax(params) {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      const docId = params.row.docId
      await deleteDoc(doc(db, 'users', userId, 'idol', idolId, 'instax', docId))
      this.$buefy.dialog.alert({
        message: '削除しました。',
        onConfirm: () => location.reload(),
      })
    },
  },
}
</script>

<style></style>

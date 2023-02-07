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

    <b-pagination
      v-model="current"
      :total="total"
      :per-page="perPage"
      :simple="isSimple"
      @change="changePage"
    >
    </b-pagination>

    <vue-good-table
      ref="idol-table"
      :columns="columns"
      :rows="rows"
      :sort-options="{
        enabled: false,
        initialSortBy: { field: 'date', type: 'desc' },
      }"
      style-class="vgt-table striped condensed"
      @on-cell-click="onCellClick"
    >
      <div slot="emptystate">
        「追加」から、チェキの情報を追加してください。
      </div>
    </vue-good-table>
    <div class="buttons mt-3">
      <b-button
        type="is-link is-light"
        @click="$router.push('/mypage/add/' + $route.params.uid)"
        >追加</b-button
      >
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
  getCountFromServer,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  limit,
  limitToLast,
  startAfter,
  endBefore,
} from 'firebase/firestore'

export default {
  data() {
    return {
      created: false,
      total: 100,
      perPage: 10,
      current: 1,
      pastCurrent: 1,
      isSimple: true,
      querySnapshot: null,
      show: true,
      profileShow: true,
      name: '',
      group: '',
      twitterId: '',
      instax_totalling: [],
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
        this.instax_totalling = docSnap.data().instax_totalling
      } else {
        this.show = false
      }

      // ページネーション
      const totalCount = await getCountFromServer(
        collection(db, 'users', userId, 'idol', idolId, 'instax')
      )
      this.total = totalCount.data().count
      this.current = 1
      this.querySnapshot = await getDocs(
        query(
          collection(db, 'users', userId, 'idol', idolId, 'instax'),
          orderBy('date', 'desc'),
          limit(this.perPage)
        )
      )

      this.querySnapshot.forEach((doc) => {
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
      this.pastCurrent = this.current
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
    async changePage() {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      const pageShift = this.current - this.pastCurrent
      if (pageShift > 0) {
        const lastVisible =
          this.querySnapshot.docs[this.querySnapshot.docs.length - 1]
        this.querySnapshot = await getDocs(
          query(
            collection(db, 'users', userId, 'idol', idolId, 'instax'),
            orderBy('date', 'desc'),
            startAfter(lastVisible),
            limit(this.perPage)
          )
        )
      } else {
        const firstVisible = this.querySnapshot.docs[0]
        this.querySnapshot = await getDocs(
          query(
            collection(db, 'users', userId, 'idol', idolId, 'instax'),
            orderBy('date', 'desc'),
            endBefore(firstVisible),
            limitToLast(this.perPage)
          )
        )
      }

      this.rows = []
      this.querySnapshot.forEach((doc) => {
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
      this.pastCurrent = this.current
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
        instax_totalling: this.instax_totalling,
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

<style>
.content ul {
  margin-left: 0em;
  margin-top: 0em;
}
</style>

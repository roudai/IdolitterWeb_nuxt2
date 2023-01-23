<template>
  <div v-if="created">
    <div v-show="show" class="mb-3">
      <h3>{{ name }}</h3>
      <h4>{{ group }}</h4>
      <b-field label="日付">
        <b-datepicker
          v-model="selectDate"
          locale="ja-JP"
          placeholder="日付を選択してください"
          icon="calendar-today"
          :icon-right="selectDate ? 'close-circle' : ''"
          icon-right-clickable
          trap-focus
          @icon-right-click="clearDate"
        >
        </b-datepicker>
      </b-field>

      <b-field label="枚数">
        <b-numberinput
          v-model="number"
          :editable="false"
          type="is-light"
          min="1"
          max="100"
        ></b-numberinput>
      </b-field>

      <b-field label="会場名">
        <b-autocomplete
          v-model="place"
          :data="filteredPlaceArray"
          placeholder="会場名"
          clearable
        >
          <template #empty>入力候補はありません</template>
        </b-autocomplete>
      </b-field>

      <b-field label="イベント名">
        <b-autocomplete
          v-model="event"
          :data="filteredEventArray"
          placeholder="イベント名"
          clearable
        >
          <template #empty>入力候補はありません</template>
        </b-autocomplete>
      </b-field>

      <b-field label="URL">
        <b-input v-model="url" placeholder="https://"></b-input>
      </b-field>
    </div>

    <div class="buttons">
      <b-button type="is-link is-light" @click="register">登録</b-button>
      <b-button type="is-link is-light" @click="$router.go(-1)">戻る</b-button>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  getDoc,
  query,
  getDocs,
  collectionGroup,
  setDoc,
} from 'firebase/firestore'

export default {
  data() {
    return {
      created: false,
      show: true,
      name: '',
      group: '',
      selectDate: new Date(),
      number: 1,
      url: '',
      place: '',
      event: '',
      placeData: [],
      eventData: [],
    }
  },
  computed: {
    filteredPlaceArray() {
      return this.placeData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .includes(this.place.toLowerCase())
      })
    },
    filteredEventArray() {
      return this.eventData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .includes(this.event.toLowerCase())
      })
    },
  },
  beforeCreate() {
    setTimeout(async () => {
      // アイドル・グループ名
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      const instaxId = this.$route.params.instax
      const docSnap = await getDoc(
        doc(db, 'users', userId, 'idol', idolId, 'instax', instaxId)
      )
      if (docSnap.exists()) {
        this.selectDate = new Date(docSnap.data().date.seconds * 1000)
        this.number = docSnap.data().number
        this.place = docSnap.data().place
        this.event = docSnap.data().event
        this.url = docSnap.data().url
      } else {
        this.show = false
      }

      // 会場名オートコンプリート
      const querySnapshot = await getDocs(query(collectionGroup(db, 'instax')))
      querySnapshot.forEach((doc) => {
        this.placeData.push(doc.data().place)
        this.eventData.push(doc.data().event)
      })
      this.created = true
    }, 0)
  },
  methods: {
    async register() {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      const instaxId = this.$route.params.instax
      await setDoc(
        doc(db, 'users', userId, 'idol', idolId, 'instax', instaxId),
        {
          date: this.selectDate,
          number: this.number,
          url: this.url,
          place: this.place,
          event: this.event,
        }
      )
      this.$router.push('/mypage/' + idolId)
    },
    clearDate() {
      this.selectDate = null
    },
  },
}
</script>

<style></style>

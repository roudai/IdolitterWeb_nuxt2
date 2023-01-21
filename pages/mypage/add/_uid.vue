<template>
  <div>
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
  collection,
  addDoc,
} from 'firebase/firestore'

export default {
  data() {
    return {
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

      // 会場名オートコンプリート
      const collectPathAutoComplete =
        'users/' +
        this.$store.getters['auth/uid'] +
        '/idol/' +
        this.$route.params.uid +
        '/instax'
      const q = query(collection(db, collectPathAutoComplete))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.placeData.push(doc.data().place)
        this.eventData.push(doc.data().event)
      })
    }, 0)
  },
  methods: {
    async register() {
      const db = getFirestore()
      const collectPath =
        'users/' +
        this.$store.getters['auth/uid'] +
        '/idol/' +
        this.$route.params.uid +
        '/instax'
      await addDoc(collection(db, collectPath), {
        date: this.selectDate,
        number: this.number,
        url: this.url,
        place: this.place,
        event: this.event,
      })
      this.$router.push('/mypage')
    },
    clearDate() {
      this.selectDate = null
    },
  },
}
</script>

<style></style>

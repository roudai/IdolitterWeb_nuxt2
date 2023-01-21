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
        <b-input v-model="place" placeholder="会場名"></b-input>
      </b-field>

      <b-field label="イベント名">
        <b-input v-model="event" placeholder="イベント名"></b-input>
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
    }
  },
  created() {
    setTimeout(async () => {
      const db = getFirestore()
      const collection = 'users/' + this.$store.getters['auth/uid'] + '/idol/'
      const document = this.$route.params.uid
      const docRef = doc(db, collection, document)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        this.group = docSnap.data().group
        this.name = docSnap.data().name
      } else {
        this.show = false
      }
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

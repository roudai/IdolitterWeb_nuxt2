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
import isUrl from 'is-url'
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
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
      if (typeof this.placeData === 'undefined') {
        return null
      }
      return this.placeData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .includes(this.place.toLowerCase())
      })
    },
    filteredEventArray() {
      if (typeof this.eventData === 'undefined') {
        return null
      }
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
      const docSnap = await getDoc(doc(db, 'users', userId, 'idol', idolId))
      if (docSnap.exists()) {
        this.group = docSnap.data().group
        this.name = docSnap.data().name
      } else {
        this.show = false
      }

      // 会場名オートコンプリート
      const AutoComplete = await getDoc(doc(db, 'users', userId))
      this.placeData = AutoComplete.data().place_list
      this.eventData = AutoComplete.data().event_list

      this.created = true
    }, 0)
  },
  methods: {
    async register() {
      if (this.url !== '' && !isUrl(this.url)) {
        this.$errorDialog(this.$buefy, '正しいURLを入力してください。')
        return
      }
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      await addDoc(collection(db, 'users', userId, 'idol', idolId, 'instax'), {
        date: this.selectDate,
        number: this.number,
        url: this.url,
        place: this.place,
        event: this.event,
      })
      await updateDoc(doc(db, 'users', userId), {
        place_list: arrayUnion(this.place),
        event_list: arrayUnion(this.event),
      })
      const setMonth =
        'instax_totalling.m' +
        String(this.selectDate.getFullYear()) +
        String(this.selectDate.getMonth() + 1).padStart(2, '0')
      await updateDoc(doc(db, 'users', userId, 'idol', idolId), {
        'instax_totalling.total': increment(this.number),
        [setMonth]: increment(this.number),
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

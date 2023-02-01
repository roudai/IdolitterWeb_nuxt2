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
      <b-button type="is-link is-light" @click="register">更新</b-button>
      <b-button type="is-link is-light" @click="deleteDocument">削除</b-button>
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
  setDoc,
  updateDoc,
  deleteDoc,
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
      initialDate: null,
      initialNumber: 1,
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
        this.initialDate = this.selectDate
        this.initialNumber = this.number
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
      await updateDoc(doc(db, 'users', userId), {
        place_list: arrayUnion(this.place),
        event_list: arrayUnion(this.event),
      })

      const initialMonth =
        'instax_totalling.m' +
        String(this.initialDate.getFullYear()) +
        String(this.initialDate.getMonth() + 1).padStart(2, '0')
      await updateDoc(doc(db, 'users', userId, 'idol', idolId), {
        'instax_totalling.total': increment(-this.initialNumber),
        [initialMonth]: increment(-this.initialNumber),
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
    deleteDocument() {
      this.$buefy.dialog.confirm({
        title: 'チェキの情報を削除します',
        message: '情報の復元はできません。削除しても良いですか？',
        cancelText: 'キャンセル',
        confirmText: 'OK',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteInstax(),
      })
    },
    async deleteInstax() {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const idolId = this.$route.params.uid
      const docId = this.$route.params.instax
      const setMonth =
        'instax_totalling.m' +
        String(this.selectDate.getFullYear()) +
        String(this.selectDate.getMonth() + 1).padStart(2, '0')
      await deleteDoc(doc(db, 'users', userId, 'idol', idolId, 'instax', docId))
      await updateDoc(doc(db, 'users', userId, 'idol', idolId), {
        'instax_totalling.total': increment(-this.initialNumber),
        [setMonth]: increment(-this.number),
      })
      this.$buefy.dialog.alert({
        message: '削除しました。',
      })
      this.$router.push('/mypage/' + idolId)
    },
    clearDate() {
      this.selectDate = null
    },
  },
}
</script>

<style></style>

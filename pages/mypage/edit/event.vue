<template>
  <div>
    <h5>イベント</h5>
    <div class="columns">
      <div class="column is-6">
        <div v-for="(item, index) in event_list" :key="index">
          <b-field>
            <p class="control">
              <b-button @click="deleteItem(index)">削除</b-button>
            </p>
            <b-input v-model="event_list[index]" expanded></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="buttons">
      <b-button type="is-link is-light" @click="add">追加</b-button>
      <b-button type="is-link is-light" @click="register">登録</b-button>
      <b-button type="is-link is-light" @click="$router.push('/mypage/edit')"
        >戻る</b-button
      >
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      event_list: [],
    }
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const userData = await getDoc(doc(db, 'users', userId))
      this.event_list = userData.data().event_list.sort()
    }, 0)
  },
  methods: {
    deleteItem(index) {
      this.event_list.splice(index, 1)
    },
    add() {
      this.event_list.push('')
    },
    async register() {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      await updateDoc(doc(db, 'users', userId), {
        event_list: this.event_list.filter(Boolean),
      })
      this.$router.push('/mypage/edit')
    },
  },
}
</script>

<template>
  <div>
    <div class="mb-3">
      <b-field label="名前">
        <b-input v-model="name" placeholder="名前"></b-input>
      </b-field>
      <b-field label="グループ">
        <b-input v-model="group" placeholder="グループ名"></b-input>
      </b-field>
      <b-field label="Twitter ID">
        <b-input v-model="twitterId" placeholder="idol_itter"></b-input>
      </b-field>
    </div>

    <div class="buttons">
      <b-button type="is-link is-light" @click="register">登録</b-button>
      <b-button type="is-link is-light" @click="$router.go(-1)">戻る</b-button>
    </div>
    <div class="notification is-warning is-light">
      <nuxt-link to="/idol">アイドル一覧</nuxt-link>
      に登録されているアイドルは、そちらから登録できます。
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      name: '',
      group: '',
      twitterId: '',
      number: 1,
    }
  },
  beforeCreate() {},
  methods: {
    async register() {
      if (this.name === '') {
        this.$errorDialog(this.$buefy, '名前を入力してください。')
        return
      }
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      await addDoc(collection(db, 'users', userId, 'idol'), {
        name: this.name,
        group: this.group,
        twitterId: this.twitterId
          .replace('@', '')
          .replace('https://twitter.com/', ''),
        instax_totalling: {
          total: 0,
        },
      })
      this.$router.push('/mypage')
    },
  },
}
</script>

<style></style>

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
  created() {},
  methods: {
    async register() {
      const db = getFirestore()
      const collectPath = 'users/' + this.$store.getters['auth/uid'] + '/idol'
      await addDoc(collection(db, collectPath), {
        name: this.name,
        group: this.group,
        twitterId: this.twitterId
          .replace('@', '')
          .replace('https://twitter.com/', ''),
      })
      this.$router.push('/mypage')
    },
  },
}
</script>

<style></style>

<template>
  <div>
    <h4>会員登録ありがとうございます！</h4>
    <div class="columns">
      <div class="column is-4">
        <b-field label="名前" horizontal>
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="ID" horizontal>
          <b-input v-model="userId"></b-input>
        </b-field>
      </div>
    </div>
    <div class="buttons">
      <b-button type="is-link is-light" @click="register">登録</b-button>
    </div>
  </div>
</template>

<script>
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteField,
} from 'firebase/firestore'

export default {
  data() {
    return {
      initialName: '',
      initialUserId: '',
      name: '',
      userId: '',
    }
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const userData = await getDoc(doc(db, 'users', userId))
      this.name = userData.data().displayName
      this.userId = userData.data().user
      this.initialName = this.name
      this.initialUserId = this.userId
    })
  },
  methods: {
    async register() {
      if (
        this.name !== this.initialName ||
        this.userId !== this.initialUserId
      ) {
        const db = getFirestore()
        // ID重複回避
        const userList = await getDoc(doc(db, 'users', 'admin'))
        if (Object.keys(userList.data().users).includes(this.userId)) {
          this.$errorDialog(
            this.$buefy,
            'このIDは他のユーザーが使用済みのため利用できません。'
          )
          return
        }
        // ユーザー名、ID更新
        const userId = this.$store.getters['auth/uid']
        await updateDoc(doc(db, 'users', userId), {
          displayName: this.name,
          user: this.userId,
        })
        // ID一覧更新
        const oldMapKey = 'users.' + this.initialUserId
        await updateDoc(doc(db, 'users', 'admin'), {
          [oldMapKey]: deleteField(),
        })
        const newMapKey = 'users.' + this.userId
        await updateDoc(doc(db, 'users', 'admin'), {
          [newMapKey]: userId,
        })
      }
      this.$router.push('/mypage')
    },
  },
}
</script>

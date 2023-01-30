<template>
  <div>
    <b-collapse class="card p-3">
      <div class="buttons">
        <b-button type="is-link is-light" @click="addColor">色追加</b-button>
        <b-button type="is-link is-light" @click="deleteColor">色削除</b-button>
      </div>
      <b-field grouped group-multiline>
        <div v-for="color in colors" :key="color">
          <b-colorpicker class="mb-2 mr-2" :value="color" />
        </div>
      </b-field>
    </b-collapse>
    <div class="buttons mt-3">
      <b-button type="is-link is-light" @click="register">更新</b-button>
      <b-button type="is-link is-light" @click="$router.push('/mypage')"
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
      colors: [],
      error: [],
    }
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const userData = await getDoc(doc(db, 'users', userId))
      userData.data().colors.forEach((color) => {
        this.colors.push(color)
      })
    })
  },
  methods: {
    addColor() {
      const color = ((Math.random() * 0xffffff) | 0).toString(16)
      const randomColor = '#' + ('000000' + color).slice(-6)
      this.colors.push(randomColor)
    },
    deleteColor() {
      this.colors.pop()
    },
    async register() {
      if (this.colors.length === 0) {
        this.$errorDialog(this.$buefy, '最低1つの色を追加してください。')
        return
      } else if (this.colors.length > 30) {
        this.$errorDialog(this.$buefy, '指定可能な色は30個までです。')
        return
      }
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      await updateDoc(doc(db, 'users', userId), {
        colors: this.colors,
      })
    },
  },
}
</script>

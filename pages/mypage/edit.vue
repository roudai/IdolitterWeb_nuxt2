<template>
  <div v-if="created">
    <b-collapse class="card p-3">
      <h4>グラフ設定</h4>
      <h5>文字の色</h5>
      <b-button type="is-link is-light" @click="resetColor">リセット</b-button>
      <b-colorpicker v-model="letterColor" class="mt-3 mb-5" />

      <h5>塗りつぶし範囲の色</h5>
      <div class="buttons">
        <b-button
          type="is-link is-light"
          :disabled="addDisabled"
          @click="addColor"
          >色追加</b-button
        >
        <b-button type="is-link is-light" @click="deleteColor">色削除</b-button>
      </div>
      <b-field grouped group-multiline>
        <div v-for="(item, index) in colors" :key="index">
          <b-colorpicker v-model="colors[index]" class="mb-2 mr-2" />
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
      created: false,
      addDisabled: false,
      letterColor: '',
      colors: [],
    }
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const userData = await getDoc(doc(db, 'users', userId))
      this.letterColor = userData.data().letter_color
      userData.data().colors.forEach((color) => {
        this.colors.push(color)
      })
      this.created = true
    })
  },
  methods: {
    resetColor() {
      this.letterColor = '#ffffff'
    },
    addColor() {
      const color = ((Math.random() * 0xffffff) | 0).toString(16)
      const randomColor = '#' + ('000000' + color).slice(-6)
      this.colors.push(randomColor)
      if (this.colors.length >= 30) {
        this.addDisabled = true
      }
    },
    deleteColor() {
      if (this.colors.length <= 1) {
        const color = ((Math.random() * 0xffffff) | 0).toString(16)
        const randomColor = '#' + ('000000' + color).slice(-6)
        this.colors.pop()
        this.colors.push(randomColor)
        return
      }
      this.colors.pop()
      if (this.addDisabled === true && this.colors.length < 30) {
        this.addDisabled = false
      }
    },
    async register() {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      await updateDoc(doc(db, 'users', userId), {
        letter_color: this.letterColor.toString('hex'),
        colors: this.colors.map((color) => color.toString('hex')),
      })
      this.$router.push('/mypage')
    },
  },
}
</script>

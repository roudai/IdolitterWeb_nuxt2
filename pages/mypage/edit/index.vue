<template>
  <div v-if="created">
    <b-collapse class="card p-3 mb-5">
      <h4>プロフィール</h4>
      <div class="columns">
        <div class="column is-4">
          <b-field label="名前" horizontal>
            <b-input v-model="name" :disabled="formDisabled"></b-input>
          </b-field>
          <b-field label="ID" horizontal>
            <b-input v-model="userId" :disabled="formDisabled"></b-input>
          </b-field>
        </div>
      </div>
      <div v-if="editButton">
        <b-button type="is-link is-light" @click="clickEdit">編集</b-button>
      </div>
      <div v-else>
        <b-button type="is-link is-light" @click="clickUpdate">更新</b-button>
      </div>
    </b-collapse>

    <b-collapse class="card p-3 mb-5">
      <h4>入力候補設定</h4>
      <div class="buttons">
        <b-button
          type="is-link is-light"
          @click="$router.push('/mypage/edit/place')"
          >会場名</b-button
        >
        <b-button
          type="is-link is-light"
          @click="$router.push('/mypage/edit/event')"
          >イベント名</b-button
        >
      </div>
    </b-collapse>

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
      <b-button class="mt-3" type="is-link is-light" @click="register"
        >更新</b-button
      >
    </b-collapse>
    <div class="buttons mt-3">
      <b-button type="is-link is-light" @click="$router.push('/mypage')"
        >戻る</b-button
      >
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
      created: false,
      formDisabled: true,
      editButton: true,
      addDisabled: false,
      initialName: '',
      initialUserId: '',
      name: '',
      userId: '',
      letterColor: '',
      colors: [],
    }
  },
  beforeCreate() {
    setTimeout(async () => {
      const db = getFirestore()
      const userId = this.$store.getters['auth/uid']
      const userData = await getDoc(doc(db, 'users', userId))
      this.name = userData.data().displayName
      this.userId = userData.data().user
      this.letterColor = userData.data().letter_color
      userData.data().colors.forEach((color) => {
        this.colors.push(color)
      })
      this.created = true
    })
  },
  methods: {
    clickEdit() {
      this.editButton = false
      this.formDisabled = false
      this.initialName = this.name
      this.initialUserId = this.userId
    },
    async clickUpdate() {
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
      this.editButton = true
      this.formDisabled = true
    },
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

<style>
input:disabled {
  color: #363636 !important;
}
</style>

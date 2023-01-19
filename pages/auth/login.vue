<template>
  <div>
    <button class="button is-info mb-2" @click="toRedirect">
      <span class="icon is-small">
        <svg viewBox="0 0 24 24">
          <path :d="iconTwitter" />
        </svg>
      </span>
      <span>ログインする</span>
    </button>
    <div class="notification is-success is-light">
      アイドリッターのツイッター認証は、ユーザーの識別のために使用されます。
      アプリケーションは読み取り権限しか取得しないため、ツイート、フォロー、DM送信等を勝手に行うことはありません。
      個人情報の取り扱いについては、<nuxt-link to="/policy"
        >プライバシーポリシー</nuxt-link
      >をご参照ください。
    </div>
  </div>
</template>

<script>
import { getAuth, TwitterAuthProvider, signInWithRedirect } from 'firebase/auth'
import { mdiTwitter } from '@mdi/js'

export default {
  data() {
    return {
      iconTwitter: mdiTwitter,
    }
  },
  methods: {
    toRedirect() {
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      signInWithRedirect(auth, provider)
      this.$router.push('/auth/redirect')
    },
  },
}
</script>

<style></style>

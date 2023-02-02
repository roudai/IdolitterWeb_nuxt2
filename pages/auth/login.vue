<template>
  <div>
    <div>
      <button class="button is-info mb-2" @click="toRedirectTwitter">
        <b-icon icon="twitter" />
        <span>Twitterでログイン</span>
      </button>
    </div>
    <div>
      <button class="button is-info is-light mb-2" @click="toRedirectGoogle">
        <b-icon icon="google" />
        <span>Googleでログイン</span>
      </button>
    </div>
    <div class="notification is-success is-light">
      アイドリッターの認証は、ユーザーの識別のために使用されます。
      ツイッターの認証はアプリケーションは読み取り権限しか取得しないため、ツイート、フォロー、DM送信等を勝手に行うことはありません。
      個人情報の取り扱いについては、<nuxt-link to="/policy"
        >プライバシーポリシー</nuxt-link
      >をご参照ください。
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  TwitterAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth'

export default {
  methods: {
    toRedirectTwitter() {
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      signInWithRedirect(auth, provider)
      this.$router.push('/auth/redirect/twitter')
    },
    toRedirectGoogle() {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      signInWithRedirect(auth, provider)
      this.$router.push('/auth/redirect/google')
    },
  },
}
</script>

<style></style>

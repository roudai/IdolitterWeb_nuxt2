<template>
  <div>
    <div>
      <button
        class="button mb-3 social"
        style="color: #ffffff; background-color: #1da1f2"
        @click="toRedirectTwitter"
      >
        <b-icon icon="twitter" />
        <span>Twitterでログイン</span>
      </button>
    </div>
    <div>
      <button
        class="button mb-3 social"
        style="color: #ffffff; background-color: #4285f4"
        @click="toRedirectGoogle"
      >
        <b-icon icon="google" />
        <span>Googleでログイン</span>
      </button>
    </div>
    <div>
      <button
        class="button mb-3 social"
        style="color: #ffffff; background-color: #000000"
        @click="toRedirectGithub"
      >
        <b-icon icon="github" />
        <span>GitHubでログイン</span>
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
  GithubAuthProvider,
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
      provider.addScope('email')
      signInWithRedirect(auth, provider)
      this.$router.push('/auth/redirect/google')
    },
    toRedirectGithub() {
      const auth = getAuth()
      const provider = new GithubAuthProvider()
      signInWithRedirect(auth, provider)
      this.$router.push('/auth/redirect/github')
    },
  },
}
</script>

<style>
button.social {
  width: 185px;
}
</style>

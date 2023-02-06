<template>
  <div>
    <div class="columns">
      <div class="column is-3">
        <h5>メールアドレスでログイン</h5>
        <b-field label="メールアドレス" :label-position="labelPosition">
          <b-input v-model="email" type="email" placeholder="email@example.com">
          </b-input>
        </b-field>
        <b-field
          label="パスワード"
          :type="passwordType"
          :label-position="labelPosition"
          :message="passwordMessage"
        >
          <b-input
            v-model="password"
            type="password"
            maxlength="64"
            password-reveal
          ></b-input>
        </b-field>
        <div v-show="errorShow" class="notification is-danger is-light">
          {{ errorMessage }}
        </div>
        <b-button type="is-info is-light" @click="userLogin">ログイン</b-button>
        <b-button type="is-info is-light" @click="userRegistration"
          >会員登録</b-button
        >
      </div>
      <div class="column is-3">
        <h5>SNSでログイン</h5>
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
      </div>
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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export default {
  data() {
    return {
      labelPosition: 'on-border',
      email: '',
      password: '',
      passwordType: '',
      passwordMessage: ['10文字以上64文字以内', '英数字と記号をどちらも含む'],
      errorShow: false,
      errorMessage: '',
    }
  },
  watch: {
    password: function (newValue) {
      const regexFull = /^(?=.*[\w])(?=.*[ -/:-@[-_])[\w -/:-@[-_]{10,64}$/
      const regexLetter = /^(?=.*[\w])(?=.*[ -/:-@[-_])[\w -/:-@[-_]/
      const regexNumber = /[!-~]{10,64}/
      if (regexFull.test(newValue)) {
        this.passwordType = ''
        this.passwordMessage = []
      } else if (newValue.length === 0) {
        this.passwordType = ''
        this.passwordMessage = [
          '10文字以上64文字以内',
          '英数字と記号をどちらも含む',
        ]
      } else if (regexLetter.test(newValue)) {
        this.passwordType = 'is-danger'
        this.passwordMessage = ['10文字以上64文字以内']
      } else if (regexNumber.test(newValue)) {
        this.passwordType = 'is-danger'
        this.passwordMessage = ['英数字と記号をどちらも含む']
      } else {
        this.passwordType = 'is-danger'
        this.passwordMessage = [
          '10文字以上64文字以内',
          '英数字と記号をどちらも含む',
        ]
      }
    },
  },
  beforeCreate() {
    setTimeout(() => {
      const isLoggedIn = this.$store.getters['auth/isLoggedIn']
      if (isLoggedIn) {
        this.$router.push('/mypage')
      }
    }, 0)
  },
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
    async userRegistration() {
      if (!this.emailAndPasswordCheck()) return
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.dispatch('auth/login', { userCredential })
        })
        .catch(() => {
          this.errorShow = true
          this.errorMessage = 'このメールアドレスは会員登録済みです。'
        })
    },
    async userLogin() {
      if (!this.emailAndPasswordCheck()) return
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.dispatch('auth/login', { userCredential })
        })
        .catch(() => {
          this.errorShow = true
          this.errorMessage =
            'メールアドレスまたはパスワードが間違っています。ユーザー未登録の場合は、会員登録を行ってください。'
        })
    },
    emailAndPasswordCheck() {
      const regexEmail =
        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
      const regexPassword =
        /^(?=.*[a-zA-Z0-9])(?=.*[ -/:-@[-_])[a-zA-Z0-9 -/:-@[-_]{10,64}$/

      if (!regexEmail.test(this.email)) {
        this.errorShow = true
        this.errorMessage = '正しくメールアドレスを入力してください。'
        return false
      } else if (!regexPassword.test(this.password)) {
        this.errorShow = true
        this.errorMessage =
          'パスワードは10文字以上64文字以内で、英数字と記号をどちらも含んでください。'
        return false
      }
      return true
    },
  },
}
</script>

<style>
button.social {
  width: 185px;
}
</style>

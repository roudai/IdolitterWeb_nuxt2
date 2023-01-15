import {
  getAuth,
  getRedirectResult,
  TwitterAuthProvider,
  signOut,
} from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
  uid: '',
  user: '',
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
  setUid(state, uid) {
    state.uid = uid
  },
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  login() {
    console.log('ログイン処理')
    const auth = getAuth()
    getRedirectResult(auth)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const secret = credential.secret
        const user = result.user
        console.log(token, secret, user)

        this.$router.push('/mypage')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  },
}

import { getAuth, getRedirectResult, signOut } from 'firebase/auth'

export const state = () => ({
  isLoggedIn: false,
})

export const mutations = {
  setLoginState(state, loggedIn) {
    state.isLoggedIn = loggedIn
  },
}

export const actions = {
  async login({ commit }) {
    const auth = getAuth()
    await getRedirectResult(auth)
      .then((result) => {
        if (result === null) {
          return
        }
        commit('setLoginState', true)
        localStorage.uid = result.user.providerData[0].uid
        localStorage.user = result.user.reloadUserInfo.screenName
        this.$router.push('/mypage')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // eslint-disable-next-line no-console
        console.log(errorCode, errorMessage)
      })
  },
  async logout({ commit }) {
    const auth = getAuth()
    await signOut(auth)
      .then(() => {
        commit('setLoginState', false)
        localStorage.removeItem('uid')
        localStorage.removeItem('user')
        this.$router.push('/auth/login')
      })
      .catch((error) => {
        alert('logout:' + error)
      })
  },
  addUserInfo({ commit }) {
    commit('setLoginState', true)
  },
}

export const getters = {
  getLoggedIn: (state) => !!state.isLoggedIn,
}

import { getAuth, getRedirectResult, signOut } from 'firebase/auth'

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
  async login({ commit }) {
    const auth = getAuth()
    await getRedirectResult(auth)
      .then((result) => {
        if (result === null) {
          return
        }
        commit('setLoginState', true)
        commit('setUid', result.user.providerData[0].uid)
        commit('setUser', result.user.reloadUserInfo.screenName)
        this.$router.push('/mypage')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  },
  async logout({ commit }) {
    const auth = getAuth()
    await signOut(auth)
      .then(() => {
        commit('setLoginState', false)
        commit('setUid', '')
        commit('setUser', '')
        this.$router.push('/auth/login')
      })
      .catch((error) => {
        alert('logout:' + error)
      })
  },
  addUserInfo({ commit }, user) {
    commit('setLoginState', true)
    commit('setUid', user.providerData[0].uid)
    commit('setUser', user.reloadUserInfo.screenName)
  },
}

export const getters = {
  getLoggedIn: (state) => !!state.isLoggedIn,
  getUid: (state) => state.uid,
  getUser: (state) => state.user,
}

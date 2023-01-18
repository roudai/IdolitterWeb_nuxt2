import { getAuth, getRedirectResult, signOut } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

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
  login({ commit }) {
    const auth = getAuth()
    getRedirectResult(auth)
      .then(async (result) => {
        if (result === null) {
          return
        }
        commit('setLoginState', true)
        commit('setUid', result.user.providerData[0].uid)
        commit('setUser', result.user.reloadUserInfo.screenName)
        const uid = result.user.providerData[0].uid
        const user = result.user.reloadUserInfo.screenName
        const name = result.user.displayName
        localStorage.uid = uid
        localStorage.user = user
        localStorage.name = name
        const db = getFirestore(this.$firebase)
        await setDoc(doc(db, 'users', uid), {
          user,
          name,
        })
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
        commit('setUid', '')
        commit('setUser', '')
        localStorage.removeItem('uid')
        localStorage.removeItem('user')
        localStorage.removeItem('name')
        this.$router.push('/auth/login')
      })
      .catch((error) => {
        alert('logout:' + error)
      })
  },
  addUserInfo({ commit }) {
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

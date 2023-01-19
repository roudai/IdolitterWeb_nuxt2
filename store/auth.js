import { getAuth, getRedirectResult, signOut } from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'

export const state = () => ({
  isLoggedIn: false,
  uid: '',
  user: '',
  displayName: '',
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
  setName(state, displayName) {
    state.displayName = displayName
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
        const uid = result.user.providerData[0].uid
        const user = result.user.reloadUserInfo.screenName
        const displayName = result.user.displayName
        commit('setLoginState', true)
        commit('setUid', uid)
        commit('setUser', user)
        commit('setName', displayName)

        const db = getFirestore(this.$firebase)
        await setDoc(doc(db, 'users', uid), {
          user,
          displayName,
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
        commit('setName', '')
        this.$router.push('/auth/login')
      })
      .catch((error) => {
        alert('logout:' + error)
      })
  },
}

export const getters = {
  isLoggedIn: (state) => !!state.isLoggedIn,
  uid: (state) => state.uid,
  user: (state) => state.user,
  displayName: (state) => state.displayName,
}

import { getAuth, getRedirectResult, signOut } from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

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
        const uid = result.user.uid
        const user = result.user.reloadUserInfo.screenName
        const displayName = result.user.displayName
        commit('setLoginState', true)
        commit('setUid', uid)

        const db = getFirestore(this.$firebase)
        const userData = await getDoc(doc(db, 'users', uid))
        if (userData.exists()) {
          // ユーザーデータが存在する場合
          commit('setUser', userData.data().user)
          commit('setName', userData.data().displayName)
        } else {
          // ユーザーデータが存在しない場合（初回ログイン）
          commit('setUser', user)
          commit('setName', displayName)

          // ユーザー情報をFirestoreに登録
          const colors = []
          for (let i = 0; i < 5; i++) {
            const color = ((Math.random() * 0xffffff) | 0).toString(16)
            const randomColor = '#' + ('000000' + color).slice(-6)
            colors.push(randomColor)
          }
          await setDoc(doc(db, 'users', uid), {
            user,
            displayName,
            colors,
            letter_color: '#ffffff',
          })
          const mapKey = 'users.' + user
          await updateDoc(doc(db, 'users', 'admin'), {
            [mapKey]: uid,
          })
        }
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

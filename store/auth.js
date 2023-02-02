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
        let uid, user, displayName
        // プロバイダーによる判定
        if (result.providerId === 'twitter.com') {
          uid = result.user.uid
          user = result.user.reloadUserInfo.screenName
          displayName = result.user.displayName
        } else if (result.providerId === 'google.com') {
          uid = result.user.uid
          user = result.user.email.split('@')[0]
          displayName = result.user.displayName
        } else if (result.providerId === 'github.com') {
          uid = result.user.uid
          user = result._tokenResponse.screenName
          displayName = result.user.displayName
        }
        const db = getFirestore(this.$firebase)
        // ID重複回避
        const userList = await getDoc(doc(db, 'users', 'admin'))
        if (Object.keys(userList.data().users).includes(user)) {
          for (let i = 2; i < 100; i++) {
            user = user + i
            if (!Object.keys(userList.data().users).includes(user)) {
              break
            }
          }
        }

        commit('setLoginState', true)
        commit('setUid', uid)

        // ユーザーデータ格納
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
            premium: false,
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

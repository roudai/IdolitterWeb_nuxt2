import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function ({ $firebase, store, route, redirect }) {
  const auth = getAuth($firebase)
  if (!store.getters['auth/getLoggedIn']) {
    // ログインされていない場合
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch('auth/addUserInfo', user)
      } else if (route.path.match(/\/mypage/)) {
        redirect('/auth/login')
      }
    })
  } else if (route.path.match(/\/login/)) {
    // ログインしている場合
    redirect('/mypage')
  }
}

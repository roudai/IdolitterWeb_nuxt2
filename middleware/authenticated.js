import { getAuth } from 'firebase/auth'

export default function ({ route, redirect }) {
  const auth = getAuth()
  if (!auth.onAuthStateChanged) {
    // ログインされていない場合
    if (route.path.match(/\/mypage/)) {
      redirect('/auth/login')
    }
  } else if (route.path.match(/\/login/)) {
    // ログインしている場合
    redirect('/mypage')
  }
}

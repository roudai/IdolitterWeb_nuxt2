export default function ({ store, route, redirect }) {
  if (!store.getters['auth/LoggedIn']) {
    // ログインされていない場合
    redirect('/auth/login')
  } else if (route.path.match(/\/login/)) {
    // ログインしている場合
    redirect('/mypage')
  }
}

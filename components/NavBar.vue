<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand ml-1">
      <a
        role="button"
        class="navbar-burger ml-0"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarMenu"
        :class="nav_class"
        @click="menuShow"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

      <a class="navbar-item has-text-info-light is-size-5" href="/">
        アイドリッター
      </a>
    </div>

    <div id="navbarMenu" class="navbar-menu" :class="nav_class">
      <div class="navbar-start">
        <a class="navbar-item" href="/idol"> アイドル一覧 </a>
        <a class="navbar-item" href="/group"> グループ一覧 </a>
        <a class="navbar-item" href="/ranking"> ランキング </a>
        <a class="navbar-item" href="/history"> 履歴 </a>
      </div>
      <div class="navbar-end">
        <!-- アイテムの配置 -->
        <div v-show="show" class="navbar-item">
          <button class="button mr-2" @click="toMypage">
            <b-icon icon="account"> </b-icon>
            <span>{{ mypage }}</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    nav_class: '',
    show: false,
    mypage: '',
  }),
  created() {
    setTimeout(() => {
      const isLoggedIn = this.$store.getters['auth/isLoggedIn']
      if (isLoggedIn) {
        this.show = true
        this.mypage = 'マイページ'
      } else {
        this.mypage = 'ログイン'
      }
    }, 0)
  },
  methods: {
    menuShow() {
      if (this.nav_class === '') {
        this.nav_class = 'is-active'
      } else {
        this.nav_class = ''
      }
    },
    toMypage() {
      if (this.$store.getters['auth/isLoggedIn']) {
        this.nav_class = ''
        this.$router.push('/mypage')
      } else {
        this.nav_class = ''
        this.$router.push('/auth/login')
      }
    },
  },
}
</script>

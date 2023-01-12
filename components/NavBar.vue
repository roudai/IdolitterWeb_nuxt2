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
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    nav_class: '',
  }),
  methods: {
    menuShow() {
      if (this.nav_class === '') {
        this.nav_class = 'is-active'
      } else {
        this.nav_class = ''
      }
    },
  },
}
</script>

<template>
  <div>
    <h5>Twitterにログインしています...</h5>
    <nuxt-link v-show="show" to="/auth/login">ログインページに戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  created() {
    this.$store.dispatch('auth/login')
    setTimeout(() => {
      this.show = true
    }, 5000)
  },
}
</script>

<style></style>

<template>
  <div v-show="show">
    <h5>{{ provider }}でログインしています...</h5>
    <nuxt-link v-show="back" to="/auth/login">ログインページに戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      back: false,
      provider: '',
    }
  },
  created() {
    const provider = this.$route.params.provider
    if (provider === 'twitter') {
      this.provider = 'Twitter'
    } else if (provider === 'google') {
      this.provider = 'Google'
    } else if (provider === 'github') {
      this.provider = 'GitHub'
    } else {
      this.show = false
    }
    this.$store.dispatch('auth/login')
    setTimeout(() => {
      this.back = true
    }, 5000)
  },
}
</script>

<style></style>

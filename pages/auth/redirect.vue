<template>
  <div>Twitterにログインしています...</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/login')
  },
}
</script>

<style></style>

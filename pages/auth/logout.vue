<template>
  <div>ログアウトします。</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/logout')
  },
}
</script>

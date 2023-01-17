<template>
  <div>
    <h5>マイページ</h5>
    <div>{{ user }}</div>
    <button class="button is-info mb-2" @click="socialAuth()">
      ログアウトする
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
    }
  },
  created() {
    this.user = localStorage.getItem('user')
  },
  methods: {
    socialAuth() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style></style>

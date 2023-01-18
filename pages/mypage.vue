<template>
  <div>
    <h5>マイページ</h5>
    <div>{{ name }}</div>
    <button class="button is-info mb-2" @click="socialAuth()">
      ログアウトする
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  created() {
    this.name = localStorage.getItem('name')
  },
  methods: {
    socialAuth() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style></style>

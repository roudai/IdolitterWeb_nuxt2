<template>
  <div>
    <button class="button is-info mb-2" @click="socialAuth()">
      Twitterでログインする
    </button>
  </div>
</template>

<script>
import { getAuth, TwitterAuthProvider, signInWithRedirect } from 'firebase/auth'

export default {
  mounted() {
    this.$store.dispatch('auth/login')
  },
  methods: {
    socialAuth() {
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      signInWithRedirect(auth, provider)
    },
  },
}
</script>

<style></style>

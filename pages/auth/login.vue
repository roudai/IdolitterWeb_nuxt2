<template>
  <div>
    <button class="button is-info mb-2" @click="socialAuth()">
      Twitterでログインする
    </button>
  </div>
</template>

<script lang="ts">
import { getAuth, TwitterAuthProvider, signInWithRedirect } from 'firebase/auth'

export default {
  mounted() {
    // this.$store.dispatch('auth/login')
  },
  methods: {
    socialAuth() {
      const auth = getAuth()
      signInWithRedirect(auth, new TwitterAuthProvider())
    },
  },
}
</script>

<style></style>

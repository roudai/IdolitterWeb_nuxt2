<template>
  <div>
    <button class="button is-info mb-2" @click="toRedirect">
      <span class="icon is-small">
        <svg viewBox="0 0 24 24">
          <path :d="iconTwitter" />
        </svg>
      </span>
      <span>ログインする</span>
    </button>
  </div>
</template>

<script>
import { getAuth, TwitterAuthProvider, signInWithRedirect } from 'firebase/auth'
import { mdiTwitter } from '@mdi/js'

export default {
  data() {
    return {
      iconTwitter: mdiTwitter,
    }
  },
  methods: {
    toRedirect() {
      const auth = getAuth()
      const provider = new TwitterAuthProvider()
      signInWithRedirect(auth, provider)
      this.$router.push('/auth/redirect')
    },
  },
}
</script>

<style></style>

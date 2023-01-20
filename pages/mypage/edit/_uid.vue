<template>
  <div>
    <h3>{{ name }}</h3>
    <h4>{{ group }}</h4>

    <div class="buttons">
      <b-button type="is-link is-light" @click="$router.go(-1)">戻る</b-button>
    </div>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      show: true,
      name: '',
      group: '',
    }
  },
  created() {
    setTimeout(async () => {
      const db = getFirestore()
      const collection = 'users/' + this.$store.getters['auth/uid'] + '/idol/'
      const document = this.$route.params.uid
      const docRef = doc(db, collection, document)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.group = docSnap.data().group
        this.name = docSnap.data().name
      } else {
        this.show = false
      }
    }, 0)
  },
}
</script>

<style></style>

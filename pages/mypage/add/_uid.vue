<template>
  <div>
    チェキレポート追加

    {{ $route.params.uid }}
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {}
  },
  created() {
    setTimeout(async () => {
      this.name = this.$store.getters['auth/displayName']

      const db = getFirestore()
      const collection = 'users/' + this.$store.getters['auth/uid'] + '/idol/'
      const document = this.$route.params.uid
      const docRef = doc(db, collection, document)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data())
      } else {
        console.log('エラー')
      }
    }, 0)
  },
}
</script>

<style></style>

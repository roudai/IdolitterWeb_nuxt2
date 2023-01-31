<template>
  <div>
    <dash-board :view="view"></dash-board>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: '',
    }
  },
  created() {
    this.view = this.$route.params.uid
  },
}
</script>

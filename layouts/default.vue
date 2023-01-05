<template>
  <div>
    <div class="main-content columns ml-0 mr-0">
      <div class="container column is-12 pl-0 pr-0">
        <nav-bar></nav-bar>
        <div class="content m-3">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
        },
      ],
    }
  },
}
</script>

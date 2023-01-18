<template>
  <div>
    <div class="main-content columns ml-0 mr-0">
      <div class="container column is-12 pl-0 pr-0">
        <nav-bar></nav-bar>
        <div class="content m-3">
          <Nuxt />
        </div>
        <footer-bar></footer-bar>
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

<style>
.group-name {
  color: #1a0dab !important;
  cursor: pointer;
}

.twitter-id {
  color: #1b94e0 !important;
  cursor: pointer;
}

.add-text {
  color: #1a0dab !important;
  cursor: pointer;
  text-decoration: underline;
}

table {
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  display: table;
}
</style>

<template>
  <div id="app">
    <MenuCom />

   <SecondMenu/>

    <div class="main-content">
      <router-view />

      <div class="menu-list"></div>
    </div>

    </div>
</template>

<script setup>
import MenuCom from '../src/components/Menu.vue'
import SecondMenu from '../src/components/secondmenu.vue'

// Note: If you are using Vue 2 or the Options API style,
// the script block would be structured differently:
/*
export default {
  components: {
    MenuCom
  }
}
*/
</script>

<style>
/* Basic styles for the app container */
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* You might want to remove default padding/margins from the body/html */
body {
  margin: 0;
  padding: 0;
}
</style>

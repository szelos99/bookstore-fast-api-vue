<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'

export default {
  name: "App",
};
</script>

<style>
:root {
  ul {
    padding-left: 0;
  }
}
#app {
  margin-top: 10px;
  width: 100%;
}
</style>

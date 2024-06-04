<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { theme } from './stores';
onMounted(() => {
  theme.getTheme()
})
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <RouterView />
</template>



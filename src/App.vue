<template>
  <TheHeader></TheHeader>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router';
import TheHeader from './components/layout/TheHeader.vue';
import './styles.css';

export default {
  components: {
    RouterView,
    TheHeader
  },
}
</script>
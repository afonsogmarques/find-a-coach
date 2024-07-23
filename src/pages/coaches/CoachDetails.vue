<template>
  DETAILS FOR COACH
  <RouterLink to="/coaches/c1/contact">Contact</RouterLink>
  <RouterView></RouterView>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  components: {
    RouterLink,
    RouterView
  }
}
</script>
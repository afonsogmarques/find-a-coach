<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>
    <div class="actions">
      <RouterLink to="/coaches/c1/contact">Contact</RouterLink>
      <RouterLink to="/coaches/c1">View Details</RouterLink>
    </div>
  </li>
</template>

<script>
import { RouterLink } from 'vue-router';
</script>


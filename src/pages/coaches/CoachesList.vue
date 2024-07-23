<template>
  <section>
    FILTER
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <RouterLink to="/register">Register as Coach</RouterLink>
      <RouterLink to="/coaches/id">CoachDetails</RouterLink>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in coaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState } from 'pinia';
import { useCoachesStore } from '../../stores/modules/coaches/index';

export default {
  components: {
    RouterLink
  },
  computed: {
    ...mapState(useCoachesStore, {
      coaches: 'listCoaches',
      hasCoaches: 'hasCoaches',
    }),
  },
}
</script>
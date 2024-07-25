<template>
  <div>
    <BaseDialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <CoachFilter @changeFilter="filterCoaches"></CoachFilter>
      </BaseCard>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)"
            >Refresh</BaseButton
          >
          <BaseButton link to="/register" v-if="canRegister">
            Register as Coach
          </BaseButton>
          <BaseButton
            link
            to="/auth?redirect=register"
            v-else-if="!isLoggedIn && !isLoading"
          >
            Login to register as coach
          </BaseButton>
        </div>
        <div v-if="isLoading">
          <BaseSpinner></BaseSpinner>
        </div>
        <h3 v-else-if="!hasCoaches">No coaches found.</h3>
        <ul v-else>
          <CoachItem
            v-for="coach in coaches"
            :key="coach.id"
            :coach="coach"
          ></CoachItem>
        </ul>
      </BaseCard>
    </section>
  </div>
</template>

<script>
  // import { mapState } from "pinia";
  import { useCoachesStore } from '../../stores/modules/coaches/index';

  import CoachItem from '../../components/coaches/CoachItem.vue';
  import BaseCard from '../../components/ui/BaseCard.vue';
  import BaseButton from '../../components/ui/BaseButton.vue';
  import CoachFilter from '../../components/coaches/CoachFilter.vue';
  import BaseSpinner from '../../components/ui/BaseSpinner.vue';
  import BaseDialog from '../../components/ui/BaseDialog.vue';
  import { handleError } from 'vue';
  import { useAuthStore } from '../../stores';

  export default {
    components: {
      CoachItem,
      BaseCard,
      BaseButton,
      CoachFilter,
      BaseSpinner,
    },
    data() {
      return {
        coachStore: useCoachesStore(),
        authStore: useAuthStore(),
        isLoading: false,
        error: null,
        coaches: [],
      };
    },
    computed: {
      // ...mapState(useCoachesStore, {
      //   coaches: 'listCoaches',
      // }),
      hasCoaches() {
        return !this.isLoading && this.coachStore.hasCoaches;
      },
      isCoach() {
        return this.coachStore.isCoach;
      },
      isLoggedIn() {
        return this.authStore.isAuthenticated;
      },
      canRegister() {
        return this.isLoggedIn && !this.isCoach && !this.isLoading;
      },
    },
    methods: {
      filterCoaches(filter) {
        this.coaches = this.coachStore.filteredCoaches(filter);
      },

      async loadCoaches(forceRefresh) {
        this.isLoading = true;

        return this.coachStore
          .loadCoaches({ forceRefresh })
          .catch(
            (error) => (this.error = error.message || 'Something went wrong')
          )
          .finally(() => (this.isLoading = false));
      },

      handleError() {
        this.error = null;
      },
    },
    async created() {
      this.loadCoaches().then(() => (this.coaches = this.coachStore.coaches));
    },
  };
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>

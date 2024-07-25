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
          <BaseButton link to="/register" v-if="!isCoach && !isLoading">
            Register as Coach
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
  import { useCoachesStore } from "../../stores/modules/coaches/index";

  import CoachItem from "../../components/coaches/CoachItem.vue";
  import BaseCard from "../../components/ui/BaseCard.vue";
  import BaseButton from "../../components/ui/BaseButton.vue";
  import CoachFilter from "../../components/coaches/CoachFilter.vue";
  import BaseSpinner from "../../components/ui/BaseSpinner.vue";
  import BaseDialog from "../../components/ui/BaseDialog.vue";
  import { handleError } from "vue";

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
        store: useCoachesStore(),
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
        return !this.isLoading && this.store.hasCoaches;
      },
      isCoach() {
        return this.store.isCoach;
      },
    },
    methods: {
      filterCoaches(filter) {
        this.coaches = this.store.filteredCoaches(filter);
      },
      async loadCoaches(forceRefresh) {
        this.isLoading = true;

        try {
          await this.store.loadCoaches({ forceRefresh });
        } catch (err) {
          this.error = err.message || "Something went wrong";
        }

        this.isLoading = false;
      },

      handleError() {
        this.error = null;
      },
    },
    async created() {
      await this.loadCoaches();
      this.coaches = this.store.coaches;
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

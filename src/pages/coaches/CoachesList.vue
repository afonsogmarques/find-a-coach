<template>
  <section>
    <BaseCard>
      <CoachFilter @changeFilter="filterCoaches"></CoachFilter>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton link to="/register" v-if="!isCoach"
          >Register as Coach</BaseButton
        >
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in coaches"
          :key="coach.id"
          :coach="coach"
        ></CoachItem>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </BaseCard>
  </section>
</template>

<script>
  // import { mapState } from "pinia";
  import { useCoachesStore } from "../../stores/modules/coaches/index";

  import CoachItem from "../../components/coaches/CoachItem.vue";
  import BaseCard from "../../components/ui/BaseCard.vue";
  import BaseButton from "../../components/ui/BaseButton.vue";
  import CoachFilter from "../../components/coaches/CoachFilter.vue";

  export default {
    components: {
      CoachItem,
      BaseCard,
      BaseButton,
      CoachFilter,
    },
    data() {
      return {
        store: useCoachesStore(),
        coaches: [],
      };
    },
    computed: {
      // ...mapState(useCoachesStore, {
      //   coaches: "listCoaches",
      // }),
      hasCoaches() {
        return this.store.hasCoaches;
      },
      isCoach() {
        return this.store.isCoach;
      },
    },
    methods: {
      filterCoaches(filter) {
        this.coaches = this.store.filteredCoaches(filter);
      },
    },
    created() {
      this.coaches = this.store.listCoaches;
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

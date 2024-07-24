<template>
  <section>
    <BaseCard> FILTER </BaseCard>
  </section>
  <section>
    <BaseCard>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton link to="/register">Register as Coach</BaseButton>
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
  import { mapState } from "pinia";
  import { useCoachesStore } from "../../stores/modules/coaches/index";

  import CoachItem from "../../components/coaches/CoachItem.vue";
  import BaseCard from "../../components/ui/BaseCard.vue";
  import BaseButton from "../../components/ui/BaseButton.vue";

  export default {
    components: {
      CoachItem,
      BaseCard,
      BaseButton,
    },
    data() {
      return {
        store: useCoachesStore(),
      };
    },
    computed: {
      // Next 2 computed methods both access the store in different ways.
      ...mapState(useCoachesStore, {
        coaches: "listCoaches",
      }),
      hasCoaches() {
        return this.store.hasCoaches;
      },
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

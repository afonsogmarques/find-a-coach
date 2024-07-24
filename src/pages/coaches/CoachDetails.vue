<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Interested? Reach out now:</h2>
        <BaseButton link :to="contactLink">Contact</BaseButton>
      </header>
      <RouterView></RouterView>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge
        v-for="area in areas"
        :key="area"
        :type="area"
        :text="area"
      ></BaseBadge>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
  import { RouterView } from "vue-router";

  import BaseCard from "../../components/ui/BaseCard.vue";
  import BaseButton from "../../components/ui/BaseButton.vue";
  import BaseBadge from "../../components/ui/BaseBadge.vue";
  import { useCoachesStore } from "../../stores/modules/coaches";

  export default {
    components: {
      RouterView,
      BaseCard,
      BaseButton,
      BaseBadge,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        store: useCoachesStore(),
      };
    },
    computed: {
      coach() {
        return this.store.getCoach({ id: this.id });
      },
      fullName() {
        return `${this.coach.firstName} ${this.coach.lastName}`;
      },
      rate() {
        return this.coach.hourlyRate;
      },
      description() {
        return this.coach.description;
      },
      areas() {
        return this.coach.areas;
      },
      contactLink() {
        return `${this.$route.path}/contact`;
      },
    },
  };
</script>

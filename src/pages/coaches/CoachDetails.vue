<template>
  <div>
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <section v-if="!coachIsUser">
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
  </div>
</template>

<script>
  import { RouterView } from 'vue-router';

  import BaseCard from '../../components/ui/BaseCard.vue';
  import BaseButton from '../../components/ui/BaseButton.vue';
  import BaseBadge from '../../components/ui/BaseBadge.vue';

  import { useCoachesStore } from '../../stores/modules/coaches';
  import { useAuthStore } from '../../stores';

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
        coachStore: useCoachesStore(),
        authStore: useAuthStore(),
      };
    },
    computed: {
      coach() {
        return this.coachStore.getCoach({ id: this.id });
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
        return `/coaches/${this.$route.params.id}/contact`;
      },
      coachIsUser() {
        return this.authStore.userId === this.id;
      },
    },
  };
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ hourlyRate }}/hour</h4>
    <div>
      <BaseBadge v-for="area in areas" :key="area" :type="area" :text="area">
        {{ area }}
      </BaseBadge>
    </div>
    <div class="actions">
      <BaseButton
        link
        :to="coachContactLink"
        mode="outline"
        v-if="!coachIsUser"
      >
        Contact
      </BaseButton>
      <BaseButton link :to="coachDetailsLink">View Details</BaseButton>
    </div>
  </li>
</template>

<script>
  import { useAuthStore } from '../../stores';
  import BaseBadge from '../ui/BaseBadge.vue';
  import BaseButton from '../ui/BaseButton.vue';

  import { mapState } from 'pinia';

  export default {
    components: {
      BaseButton,
      BaseBadge,
    },
    props: {
      coach: {
        type: Object,
        required: true,
      },
    },
    computed: {
      fullName() {
        return `${this.coach.firstName} ${this.coach.lastName}`;
      },
      coachContactLink() {
        return `${this.$route.path}/${this.coach.id}/contact`;
      },
      coachDetailsLink() {
        return `${this.$route.path}/${this.coach.id}`;
      },
      hourlyRate() {
        return this.coach.hourlyRate;
      },
      areas() {
        return this.coach.areas;
      },
      coachIsUser() {
        return this.coach.id === this.userId;
      },
      ...mapState(useAuthStore, ['userId']),
    },
  };
</script>

<style scoped>
  li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h3,
  h4 {
    margin: 0.5rem 0;
  }

  div {
    margin: 0.5rem 0;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>

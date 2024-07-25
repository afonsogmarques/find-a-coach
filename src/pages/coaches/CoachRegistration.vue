<template>
  <div>
    <section>
      <BaseCard>
        <h2>Register as a coach now!</h2>
        <CoachForm @saveData="saveData"></CoachForm>
      </BaseCard>
    </section>
  </div>
</template>

<script>
  import CoachForm from "../../components/coaches/CoachForm.vue";
  import BaseCard from "../../components/ui/BaseCard.vue";
  import { useCoachesStore } from "../../stores/modules/coaches";

  export default {
    components: {
      CoachForm,
      BaseCard,
    },
    data() {
      return {
        store: useCoachesStore(),
      };
    },
    methods: {
      saveData(formData) {
        this.store.registerCoach(formData);
        // unlike $router.push(), replace() will not allow the user
        // to navigate back to the previous page once redirected.
        this.$router.replace("/coaches");
      },
    },
  };
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your e-mail:</label>
        <input type="text" name="" id="email" v-model.message="email" />
      </div>
      <div class="form-control">
        <label for="message">Your message:</label>
        <textarea name="message" id="message" v-model.trim="message"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and non-empty message.
      </p>
      <div class="actions">
        <BaseButton>Send message</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
  import { useRequestsStore } from "../../stores/modules/requests";

  export default {
    data() {
      return {
        email: "",
        message: "",
        formIsValid: true,
        store: useRequestsStore(),
      };
    },
    methods: {
      submitForm() {
        this.formIsValid = true;

        if (
          !this.email ||
          !this.email.includes("@") ||
          !this.email.includes(".") ||
          !this.message
        ) {
          this.formIsValid = false;
          return;
        }

        this.store.addRequest({
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id,
        });

        this.$router.replace("/coaches");
      },
    },
  };
</script>

<style scoped>
  .errors {
    font-weight: bold;
    color: red;
  }

  .actions {
    text-align: center;
  }
</style>

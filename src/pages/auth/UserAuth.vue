<template>
  <div>
    <BaseDialog :show="!!error" title="An error ocurred" @close="handleError">
      {{ error }}
    </BaseDialog>
    <BaseDialog fixed :show="isLoading" title="Authenticating">
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <form @submit.prevent="submitForm">
      <BaseCard>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password must be at least 6 characters
          long.
        </p>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </BaseCard>
    </form>
  </div>
</template>

<script>
  import BaseButton from '../../components/ui/BaseButton.vue';
  import BaseCard from '../../components/ui/BaseCard.vue';
  import BaseDialog from '../../components/ui/BaseDialog.vue';
  import BaseSpinner from '../../components/ui/BaseSpinner.vue';

  import { useAuthStore } from '../../stores';

  export default {
    components: {
      BaseButton,
      BaseCard,
      BaseDialog,
      BaseSpinner,
    },
    data() {
      return {
        email: '',
        password: '',
        formIsValid: true,
        mode: 'login',
        store: useAuthStore(),
        isLoading: false,
        error: null,
      };
    },
    computed: {
      submitButtonCaption() {
        return this.mode === 'login' ? 'Login' : 'Sign up';
      },
      switchModeButtonCaption() {
        return this.mode === 'login' ? 'Sign up instead' : 'Login instead';
      },
    },
    methods: {
      submitForm() {
        if (
          !this.email ||
          !this.email.includes('@') ||
          this.password.length < 6
        )
          return (this.formIsValid = false);

        this.isLoading = true;

        const payload = {
          email: this.email,
          password: this.password,
        };

        switch (this.mode) {
          case 'signup':
            this.handleAuth(
              this.store.signup,
              payload,
              'Something went wrong. Try a different email?'
            );
            break;
          case 'login':
            this.handleAuth(
              this.store.login,
              payload,
              'Something went wrong. Invalid credentials?'
            );
            break;
        }
      },

      switchAuthMode() {
        this.mode = this.mode === 'login' ? 'signup' : 'login';
      },

      handleError() {
        this.error = null;
      },

      handleAuth(callback, payload, errorMessage) {
        const redirectUrl = `/${this.$route.query.redirect || 'coaches'}`;

        callback(payload)
          .then(() => this.$router.push(redirectUrl))
          .catch((error) => (this.error = error.message || errorMessage))
          .finally(() => (this.isLoading = false));
      },
    },
  };
</script>

<style scoped>
  form {
    border-radius: none;
    border: none;
  }
</style>

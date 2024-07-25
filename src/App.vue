<template>
  <TheHeader></TheHeader>
  <RouterView v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </RouterView>
</template>

<script>
  import { RouterView } from 'vue-router';
  import TheHeader from './components/layout/TheHeader.vue';
  import './styles.css';
  import { useAuthStore } from './stores';

  export default {
    components: {
      RouterView,
      TheHeader,
    },
    data() {
      return {
        authStore: useAuthStore(),
      };
    },
    computed: {
      didAutoLogout() {
        return this.authStore.getDidAutoLogout;
      },
    },
    created() {
      this.authStore.autoLogin();
    },
    watch: {
      didAutoLogout(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.$router.replace('/auth');
        }
      },
    },
  };
</script>

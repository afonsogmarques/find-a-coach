<template>
  <TheHeader></TheHeader>
  <RouterView v-slot="slotProps">
    <Transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </Transition>
  </RouterView>
</template>

<script>
  import { RouterView } from "vue-router";
  import TheHeader from "./components/layout/TheHeader.vue";
  import "./styles.css";

  export default {
    components: {
      RouterView,
      TheHeader,
    },
  };
</script>

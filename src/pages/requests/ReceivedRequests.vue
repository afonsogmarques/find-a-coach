<template>
  <section>
    <BaseCard>
      <header>
        <h2>Received requests</h2>
      </header>
      <ul v-if="hasRequests">
        <RequestItem
          v-for="request in receivedRequests"
          :email="request.email"
          :message="request.message"
          :key="request.id"
        ></RequestItem>
      </ul>
      <h3 v-else>You haven't received any requests yet.</h3>
    </BaseCard>
  </section>
</template>

<script>
  import { useRequestsStore } from "../../stores/modules/requests";
  import RequestItem from "../../components/requests/RequestItem.vue";

  export default {
    components: {
      RequestItem,
    },
    data() {
      return {
        store: useRequestsStore(),
      };
    },
    computed: {
      receivedRequests() {
        return this.store.receivedRequests;
      },
      hasRequests() {
        return this.store.hasRequests;
      },
    },
  };
</script>

<style scoped>
  header {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
  }
</style>

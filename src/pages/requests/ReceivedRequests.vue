<template>
  <div>
    <BaseDialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Received requests</h2>
        </header>
        <BaseSpinner v-if="isLoading"></BaseSpinner>
        <h3 v-else-if="!hasRequests">You haven't received any requests yet.</h3>
        <ul v-else>
          <RequestItem
            v-for="request in receivedRequests"
            :email="request.email"
            :message="request.message"
            :key="request.id"
          ></RequestItem>
        </ul>
      </BaseCard>
    </section>
  </div>
</template>

<script>
  import { useRequestsStore } from "../../stores/modules/requests";
  import RequestItem from "../../components/requests/RequestItem.vue";
  import BaseDialog from "../../components/ui/BaseDialog.vue";
  import { handleError } from "vue";
  import BaseSpinner from "../../components/ui/BaseSpinner.vue";

  export default {
    components: {
      RequestItem,
    },
    data() {
      return {
        store: useRequestsStore(),
        error: null,
        isLoading: false,
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
    methods: {
      async loadRequests() {
        this.isLoading = true;

        this.store
          .loadRequests()
          .catch(
            (error) => (this.error = error.message || "Something went wrong.")
          )
          .finally(() => (this.isLoading = false));
      },
      handleError() {
        this.error = null;
      },
    },
    async created() {
      await this.loadRequests();
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

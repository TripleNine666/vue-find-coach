<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't reseived any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { RequestItem },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("requests", ["hasRequests", "requests"]),
  },
  methods: {
    ...mapActions("requests", ["fetchRequest"]),
    async displayRequests() {
      this.isLoading = true;
      try {
        await this.fetchRequest();
      } catch (error) {
        this.error = error.message || "Something failed!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.displayRequests();
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

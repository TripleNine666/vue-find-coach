<template>
  <section>Filter</section>
  <section>
    <div>
      <button>Refresh</button>
      <router-link to="/register">Register as a coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <li v-for="coach in coaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches yet.</h3>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches"]),
  },
};
</script>

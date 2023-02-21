<template>
  <section>
    <coach-filter @update-filter="updateFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register"
          >Register as a coach</base-button
        >
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filterdCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches yet.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      chosenCoaches: {
        frontend: false,
        backend: false,
        career: false,
      },
    };
  },
  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches", "isCoach"]),
    filterdCoaches() {
      let returnedCoaches = this.coaches;
      for (const [area, value] of Object.entries(this.chosenCoaches)) {
        if (value) {
          returnedCoaches = returnedCoaches.filter((coach) =>
            coach.areas.includes(area)
          );
        }
      }
      return returnedCoaches;
    },
  },
  methods: {
    ...mapActions("coaches", ["loadCoaches"]),
    updateFilter(updatedFilter) {
      this.chosenCoaches = updatedFilter;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <section>
    <coach-filter @update-filter="updateFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as a coach</base-button>
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
import { mapGetters } from "vuex";
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      chosenCoaches: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    ...mapGetters("coaches", ["coaches", "hasCoaches"]),
    filterdCoaches() {
      return this.coaches.filter((coach) => {
        if (this.chosenCoaches.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.chosenCoaches.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.chosenCoaches.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    updateFilter(updatedFilter) {
      this.chosenCoaches = updatedFilter;
    },
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

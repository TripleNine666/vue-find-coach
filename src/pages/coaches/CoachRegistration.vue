<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="addCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
import { mapActions } from "vuex";
export default {
  components: {
    CoachForm,
  },
  methods: {
    ...mapActions("coaches", ["registerCoach"]),
    addCoach(data) {
      this.registerCoach(data);
      this.$router.replace("/");
    },
  },
};
</script>

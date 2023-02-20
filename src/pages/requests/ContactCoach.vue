<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Your Email</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.value"
        @blur="clearValidaty('email')"
      />
      <p v-if="!email.isValid">Please check your E-mail adress!</p>
    </div>
    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message">Your Message</label>
      <textarea
        rows="5"
        id="message"
        v-model.trim="message.value"
        @blur="clearValidaty('message')"
      ></textarea>
      <p v-if="!message.isValid">
        Please, make sure that your message is not empty!
      </p>
    </div>
    <div class="actions">
      <base-button>Send</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: "",
        isValid: true,
      },
      message: {
        value: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      this.formValidator();
      if (this.formIsValid) {
        this.$store.dispatch("requests/contactCoach", {
          coachId: this.$route.params.id,
          email: this.email.value,
          message: this.message.value,
        });
        this.$router.replace("/coaches");
      }
    },
    clearValidaty(input) {
      this[input].isValid = true;
    },
    formValidator() {
      if (this.email.value === "" || !this.email.value.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.value === "") {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #c5d5ff;
  outline: none;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.actions {
  text-align: center;
}
</style>

<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Authendicate Error!"
      @close="handleError"
      :error="true"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authendicating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!formIsValid">Please enter a valid email and password!</p>
        <base-button>{{ buttonCapture }} </base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{
          buttonModeCapture
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    buttonCapture() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Sign Up";
      }
    },
    buttonModeCapture() {
      if (this.mode === "login") {
        return "Sign Up instead ";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.emaill === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === "login") {
          // await this.$store.dispatch("login");
        } else {
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
      } catch (err) {
        this.error = err.message || "Faied to authendicate!";
      }

      this.isLoading = false;
    },
    switchMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
</style>

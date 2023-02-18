<template>
  <form @submit.prevent="submit">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.value"
        @blur="clearValidaty('firstName')"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="clearValidaty('lastName')"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        rows="5"
        id="description"
        v-model.trim="description.value"
        @blur="clearValidaty('description')"
      />
      <p v-if="!description.isValid">Description must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="clearValidaty('rate')"
      />
      <p v-if="!rate.isValid">Hourly rate must not be empty or negative!</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          value="frontend"
          id="frontend"
          v-model="areas.value"
          @blur="clearValidaty('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="backend"
          id="backend"
          v-model="areas.value"
          @blur="clearValidaty('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="career"
          id="career"
          v-model="areas.value"
          @blur="clearValidaty('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">Please chose at least one area of expertise</p>
    </div>
    <p v-if="!formIsValid">
      Please make sure that you entered all information about yourself!
    </p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
import BaseButton from "../ui/BaseButton.vue";
export default {
  emits: ["save-data"],
  components: { BaseButton },
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      rate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidaty(input) {
      this[input].isValid = true;
    },
    formValidate() {
      this.formIsValid = true;
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.value === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submit() {
      this.formValidate();
      if (!this.formIsValid) {
        return;
      }
      const newCoach = {
        first: this.firstName.value,
        last: this.lastName.value,
        desc: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };
      this.$emit("save-data", newCoach);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #c5d5ff;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

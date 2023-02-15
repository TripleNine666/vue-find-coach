<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #05064d;
  border: 1px solid #05064d;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #000131;
  border-color: #000131;
}

.flat {
  background-color: transparent;
  color: #05064d;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #05064d;
  color: #05064d;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #e71a47;
}
</style>

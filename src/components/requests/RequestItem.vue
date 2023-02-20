<template>
  <li>
    <div>
      <a :href="emailLinl">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ["email", "message"],
  computed: {
    emailLinl() {
      return "mailto:" + this.email;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
}

a {
  color: #3d008d;
  text-decoration: none;
  font-weight: bold;
}

a:hover,
a:active {
  color: #e71a47;
}

p {
  margin: 0.5rem 0 0 0;
}
</style>

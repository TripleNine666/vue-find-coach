<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" @change="updateFilter" />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" @change="updateFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" @change="updateFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        frontend: false,
        backend: false,
        career: false,
      },
    };
  },
  methods: {
    updateFilter(event) {
      const areaId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilter = {
        ...this.filters,
        [areaId]: isActive,
      };
      this.filters = updatedFilter;
      this.$emit("update-filter", updatedFilter);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>

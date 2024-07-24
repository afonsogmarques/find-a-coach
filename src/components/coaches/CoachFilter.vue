<template>
  <h2>Find your Coach</h2>
  <span class="filter-option">
    <label for="frontend">Frontend</label>
    <input
      type="checkbox"
      name="frontend"
      id="frontend"
      checked
      @change="setFilter"
    />
  </span>
  <span class="filter-option">
    <label for="backend">Backend</label>
    <input
      type="checkbox"
      name="backend"
      id="backend"
      checked
      @change="setFilter"
    />
  </span>
  <span class="filter-option">
    <label for="career">Career</label>
    <input
      type="checkbox"
      name="career"
      id="career"
      checked
      @change="setFilter"
    />
  </span>
</template>

<script>
export default {
  emits: ['changeFilter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;

      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };

      this.filters = updatedFilters;

      this.$emit('changeFilter', updatedFilters);
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

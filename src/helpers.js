export const getAppliedFilters = (filters) => {
  return Object.keys(filters)
    .filter(key => filters[key]);
}
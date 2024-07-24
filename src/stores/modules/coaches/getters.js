import { getAppliedFilters } from '../../../helpers';
import { useStore } from '../..';

export default {
  listCoaches(state) {
    return state.coaches || [];
  },

  hasCoaches(state) {
    return !!state.coaches?.length;
  },

  getCoach(state) {
    return ({ id }) => state.coaches?.find((coach) => coach.id == id);
  },

  filteredCoaches(state) {
    return (filters) =>
      state.coaches.filter((coach) => {
        const appliedFilters = getAppliedFilters(filters);
        return coach.areas.some((a) => appliedFilters.includes(a));
      });
  },

  isCoach(state) {
    const rootStore = useStore();
    return state.coaches.some((coach) => coach.id === rootStore.userId);
  },
};

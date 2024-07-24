export default {
  listCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return !!state.coaches?.length;
  },
  getCoach(state) {
    return ({ id }) => state.coaches?.find(coach => coach.id === id);
  }
}
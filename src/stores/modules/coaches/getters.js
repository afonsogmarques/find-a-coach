export default {
  listCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return !!state.coaches?.length;
  }
}
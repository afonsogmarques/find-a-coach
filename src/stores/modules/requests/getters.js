import { useStore } from "../..";

export default {
  receivedRequests(state) {
    const rootStore = useStore();
    return state.requests?.filter((request) => request.coachId === rootStore.userId) || [];
  },
  hasRequests(state) {
    return state.requests && state.requests.length;
  }
};
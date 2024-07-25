// import { useAuthStore } from "../..";

export default {
  receivedRequests(state) {
    // const { userId } = useAuthStore();
    // return state.requests?.filter((request) => request.coachId === userId) || [];
    return state.requests;
  },
  hasRequests(state) {
    // const { userId } = useAuthStore();
    // return state.requests && !!state.requests.some((req) => req.coachId === userId);
    return !!state.requests?.length;
  }
};
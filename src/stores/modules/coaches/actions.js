import { useStore } from "../..";

export default {
  registerCoach(payload) {
    const rootStore = useStore();

    this.coaches.unshift({
      ...payload,
      id: rootStore.userId
    });
  }
};
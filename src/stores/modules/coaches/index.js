import { defineStore } from "pinia";
import actions from "./actions";
import getters from "./getters";

export const useCoachesStore = defineStore('coaches', {
  state() {
    return {
      coaches: []
    };
  },
  getters,
  actions,
});
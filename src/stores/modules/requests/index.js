import { defineStore } from "pinia";
import actions from "./actions";
import getters from "./getters";

export const useRequestsStore = defineStore('requests', {
  state() {
    return {
      requests: [],
    };
  },
  actions,
  getters
});
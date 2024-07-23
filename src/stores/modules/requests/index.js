import { defineStore } from "pinia";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export const useRequestsStore = defineStore({
  state() {
    return {};
  },
  mutations,
  actions,
  getters
});
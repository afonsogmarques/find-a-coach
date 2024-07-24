import { createPinia, defineStore } from 'pinia';

export default createPinia();

export const useStore = defineStore('store', {
  state() {
    return {
      userId: 'c3',
    };
  }
});
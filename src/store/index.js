import { defineStore } from 'pinia';

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      count: 0,
    };
  }
})
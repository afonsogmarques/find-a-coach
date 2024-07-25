import { createPinia, defineStore } from 'pinia';
import { handleJSONFetch } from '../helpers';

export default createPinia();

const API_KEY = 'AIzaSyCG4zrJFl_gDaOFUV9vQQ0DSzxHaNSi7_s';
let timer = null;

export const useAuthStore = defineStore('store', {
  state() {
    return {
      userId: null,
      idToken: null,
      didAutoLogout: false,
    };
  },
  getters: {
    token(state) {
      return state.idToken;
    },
    isAuthenticated(state) {
      return !!state.idToken;
    },
    getDidAutoLogout(state) {
      return state.didAutoLogout;
    }
  },
  actions: {
    async login(payload) {
      return this.auth({ ...payload, mode: 'login' });
    },

    async signup(payload) {
      return this.auth({ ...payload, mode: 'signup' });
    },

    async auth(payload) {
      const { mode } = payload;
      const url = mode === 'login'
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

      const body = JSON.stringify({
        ...payload,
        returnSecureToken: true
      });

      const params = { method: 'POST', body };

      return fetch(url, params)
        .then(handleJSONFetch)
        .then((res) => {
          const expiresIn = +res.expiresIn * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          localStorage.setItem('idToken', res.idToken);
          localStorage.setItem('userId', res.localId);
          localStorage.setItem('tokenExpiration', expirationDate);

          timer = setTimeout(() => this.autoLogout(), expiresIn);

          this.idToken = res.idToken;
          this.userId = res.localId;
          this.didAutoLogout = false;
        });
    },

    autoLogin() {
      const idToken = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) return;

      timer = setTimeout(() => this.autoLogout(), expiresIn);

      if (idToken && userId) {
        this.userId = userId;
        this.idToken = idToken;
      }
    },

    logout() {
      this.userId = null;
      this.idToken = null;

      clearTimeout(timer);

      localStorage.removeItem('userId');
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiresIn');
    },

    autoLogout() {
      this.logout();
      this.didAutoLogout = true;
    }
  }
});
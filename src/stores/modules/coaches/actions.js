import { useAuthStore } from "../..";

export default {
  async registerCoach(payload) {
    const { idToken, userId } = useAuthStore();
    const url = `https://find-a-coach-b1c07-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${idToken}`;

    const req = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    if (!req.ok) {
      // Handle error...
    }

    this.coaches.unshift({ ...payload, id: userId });
  },

  async loadCoaches(payload) {
    if (!this.shouldUpdate && !payload.forceRefresh) return;

    const { token } = useAuthStore();
    const url = `https://find-a-coach-b1c07-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`;
    const res = await fetch(url);
    const resData = await res.json();

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const coach in resData) {
      coaches.push({
        ...resData[coach],
        id: coach,
      });
    }

    this.coaches = coaches;
    this.setFetchTimestamp();
  },

  setFetchTimestamp() {
    this.lastFetch = new Date().getTime();
  }
};

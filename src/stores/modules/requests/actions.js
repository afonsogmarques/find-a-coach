import { useAuthStore } from '../..';
import { handleJSONFetch } from '../../../helpers';

export default {
  async addRequest({ email, message, coachId }) {
    const url = `https://find-a-coach-b1c07-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`;

    const payload = { email, message };

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(handleJSONFetch)
      .then(() => this.requests.push({ ...payload, coachId }));
  },

  async loadRequests() {
    const { userId: coachId, idToken } = useAuthStore();
    const url = `https://find-a-coach-b1c07-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${idToken}`;

    return fetch(url)
      .then(handleJSONFetch)
      .then((res) => {
        const requests = [];

        for (const request in res) {
          requests.push(res[request]);
        }

        this.requests = requests;
      });
  },
};

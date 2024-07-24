import { useStore } from "../..";

export default {
  async registerCoach(payload) {
    const { userId: id } = useStore();
    const url = `https://find-a-coach-b1c07-default-rtdb.europe-west1.firebasedatabase.app/coaches/${id}.json`;

    const req = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });

    if (!req.ok) {
      // Handle error...
    }

    this.coaches.unshift({ ...payload, id });
  },
  async loadCoaches() {
    const url = `https://find-a-coach-b1c07-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`;
    const res = await fetch(url);
    const resData = await res.json();

    if (!res.ok) {
      // ...
    }
    const coaches = [];

    for (const coach in resData) {
      coaches.push(resData[coach]);
    }

    this.coaches = coaches;
  }
};
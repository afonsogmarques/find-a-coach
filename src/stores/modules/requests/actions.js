export default {
  addRequest({ email, message, coachId }) {
    this.requests.push({
      id: new Date().getTime(),
      coachId,
      email,
      message
    });
  }
};
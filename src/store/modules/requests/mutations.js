export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setRequsts(state, payload) {
    state.requests = payload;
  },
};

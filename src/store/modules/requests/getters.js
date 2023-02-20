export default {
  hasRequests(state) {
    return state.requests.length > 0;
  },
  requests(state) {
    return state.requests;
  },
};

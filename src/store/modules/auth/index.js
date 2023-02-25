import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  store() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};

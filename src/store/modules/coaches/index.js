import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Maximilian",
          lastName: "Schwarzmüller",
          areas: ["frontend", "backend", "career"],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Pavel",
          lastName: "Nagorskiy",
          areas: ["frontend", "career"],
          description:
            "I am Pavel and as a senior developer in a greate tech company, I can help you get your first job or progress in your current role.",
          hourlyRate: 20,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
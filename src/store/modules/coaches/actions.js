export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate,
    };

    const response = await fetch(
      `https://vue-coach-finder-project-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      //Error
    }

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },
};

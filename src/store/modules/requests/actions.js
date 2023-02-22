export default {
  async contactCoach(context, payload) {
    const request = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-coach-finder-project-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(request),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = Error(responseData.message || "Feiled to send!");
      throw error;
    }

    request.id = responseData.name;
    request.coachId = payload.coachId;

    context.commit("addRequest", request);
  },
  async fetchRequest(context) {
    const userId = context.rootGetters.userId;
    const response = await fetch(
      `https://vue-coach-finder-project-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = Error(responseData.message || "Feiled to fetch requests!");
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: userId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequsts", requests);
  },
};

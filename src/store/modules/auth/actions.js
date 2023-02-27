export default {
  async signIn(context, payload) {
    let url;
    let errorMessage;
    if (payload.mode === "login") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo8LF-EphCpFQ0uXG09mXgLdU7UzVP47k";
      errorMessage =
        "Failed to authendicate. Please check you E-mail or password!";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo8LF-EphCpFQ0uXG09mXgLdU7UzVP47k";
      errorMessage =
        "Failed to authendicate. User with this E-mail already exists!";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || errorMessage);
      throw error;
    }

    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};

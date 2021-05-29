export const reducer = (state, action) => {
  if (action.type === "LOGIN_SUCCESS") {
    let newAccessToken = action.payload.accessToken;
    let newRefreshToken = action.payload.refreshToken;

    if (newAccessToken && newRefreshToken) {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    }
    return {
      ...state,
    };
  }

  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      accessToken: "",
      refreshToken: "",
    };
  }
  throw new Error("You didn't catch some action");
};

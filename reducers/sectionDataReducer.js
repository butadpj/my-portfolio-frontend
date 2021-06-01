export const reducer = (state, action) => {
  if (action.type === "DATA_INIT") {
    return {
      ...state,
      isLoading: false,
    };
  }

  throw new Error("You didn't catch some action");
};

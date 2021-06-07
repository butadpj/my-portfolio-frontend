export const reducer = (state, action) => {
  if (action.type === "DATA_INIT") {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === "DATA_SECTION_VERSION") {
    return {
      ...state,
      selectedVersion: action.payload,
    };
  }

  if (action.type === "DATA_SECTION_VERSION_ID") {
    return {
      ...state,
      selectedVersionId: {
        ...state.selectedVersions,
        homeId: action.payload.homeId,
        aboutId: action.payload.aboutId,
      },
    };
  }
  throw new Error("You didn't catch some action");
};

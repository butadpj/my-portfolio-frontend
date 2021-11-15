// Return a filtered data based on specified versionTitle - v1, v2, v3 ...
export const selectDataVersion = (versionTitle = "v1", data = []) => {
  if (data.length) {
    const selectedVersion = data.filter(
      (version) => version.version_title === versionTitle
    );
    return selectedVersion[0];
  }
};
// Return a filtered data based on specified versionTitle - v1, v2, v3 ...
const useGetVersion = (versionTitle = "v1", data = []) => {
  const selectedVersion = data.filter(
    (version) => version.version_title === versionTitle
  );
  return selectedVersion[0];
};

export default useGetVersion;

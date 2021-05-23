const useGetVersion = (versionTitle = "", data = []) => {
  const selectedVersion = data.filter(
    (version) => version.version_title === versionTitle
  );
  return selectedVersion[0];
};

export default useGetVersion;

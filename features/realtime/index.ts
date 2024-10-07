const EXPO_ACCESS_STREAM_KEY = process.env.EXPO_ACCESS_STREAM_KEY;

const useRealtime = (
  showLoadingContent: () => void,

  hideLoadingContent: () => void
) => {
  // useEffect(() => {
  //   LocalAuthentication.authenticateAsync().then((data) => {
  //     console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   LocalAuthentication.hasHardwareAsync().then((data) => {
  //     console.log("Hardware available:", data);
  //   });
  // }, []);

  // useEffect(() => {
  //   LocalAuthentication.supportedAuthenticationTypesAsync().then((data) => {
  //     console.log("hardware auth support", data);
  //   });
  // }, []);

  return {};
};

export default useRealtime;

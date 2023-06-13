export const useExceptions = ({ removeStore }: { removeStore?: Function }) => {
  const _onHandleException = (error: any) => {
    switch (error?.response?.status) {
      case 401:
        removeStore?.("");
        window.location = window.location;
        break;
      default:
        break;
    }
    return error;
  };
  return { handleException: _onHandleException };
};

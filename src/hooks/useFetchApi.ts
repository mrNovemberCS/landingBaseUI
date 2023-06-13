import { API_METHOD, BASE_URL_API } from "@/utils";
import axiosService from "../utils/axiosService";
import { useExceptions } from "./useException";
import useLocalStorage from "./useLocalStorage";

export const useFetchAPI = () => {
  const [initStore, removeStore] = useLocalStorage("initData", "");
  const { handleException } = useExceptions({ removeStore });

  const authHeader = `Bearer ${initStore}`;

  const fetchApi = async (setting: {
    endpoint: string;
    method?: string;
    config?: any | undefined;
    sendData?: any | undefined;
    attachAuth?: any | undefined;
  }) => {
    const {
      endpoint,
      method = API_METHOD.GET,
      config = null,
      sendData = null,
      attachAuth = null,
    } = setting;
    const url = `${BASE_URL_API}${endpoint}`;
    switch (method) {
      case API_METHOD.POST:
        try {
          const { data: postData } = await axiosService.post(
            url,
            sendData,
            attachAuth ? attachAuth : authHeader,
            config
          );
          if (postData) {
            return { status: true, data: postData };
          }
        } catch (error: any) {
          handleException(error);
          return { status: false, data: error?.response?.data };
        }

        break;
      case API_METHOD.PUT:
        const { data: putData } = await axiosService.put(
          url,
          sendData,
          authHeader
        );
        if (!putData?.success) {
          return handleException(putData);
        }
        if (putData?.success) {
          return { status: true, data: putData?.data };
        }
        break;
      case API_METHOD.PATCH:
        try {
          const { data: patchData } = await axiosService.patch(
            url,
            sendData,
            authHeader
          );
          if (patchData) {
            return { status: true, data: patchData?.data };
          }
        } catch (error) {
          handleException(error);
        }
        break;
      case API_METHOD.DELETE:
        try {
          const { data: delData } = await axiosService.delete(
            url,
            sendData,
            authHeader
          );
          if (delData) {
            return { status: true, data: delData };
          }
        } catch (error) {
          handleException(error);
        }
        break;

      default:
        try {
          const { data: getData } = await axiosService.get(url, authHeader);

          if (!getData) {
            return handleException(getData);
          }
          if (getData) {
            return { status: true, data: getData };
          }
        } catch (error) {
          handleException(error);
        }
        break;
    }
  };

  return { fetchApi };
};

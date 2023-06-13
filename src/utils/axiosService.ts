import axios from "axios";

class AxiosService {
  instance: any;
  constructor() {
    const instance = axios.create();
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(resp: any) {
    return resp;
  }

  handleError(err: any) {
    return Promise.reject(err);
  }

  get(url: string, headers: any) {
    return this.instance.get(url, { headers: { Authorization: headers } });
  }

  post(url: string, body: any, headers: any, onUploadProgress: any) {
    const config = {
      headers: { Authorization: headers },
      onUploadProgress,
    };
    return this.instance.post(url, body, config);
  }

  put(url: string, body: any, headers: any) {
    const config = {
      headers: { Authorization: headers },
    };

    return this.instance.put(url, body, config);
  }
  patch(url: string, body: any, headers: any) {
    const config = {
      headers: { Authorization: headers },
    };

    return this.instance.patch(url, body, config);
  }

  delete(url: string, body: any, headers: any) {
    const config = {
      headers: { Authorization: headers },
    };
    return this.instance.delete(url, { body, ...config });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AxiosService();

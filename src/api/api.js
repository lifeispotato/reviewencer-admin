import axios from "axios";

// const url = "http://192.168.1.3:4000";
const url = "http://118.67.128.111:4001";
const baseURL = `${url}/api/`;

export const _axios = axios.create({
  baseURL,
});

export default class api {
  static async getAuthorizeHeader() {
    const token = localStorage.getItem("token");

    return token
      ? {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      : {};
  }

  static async send({ url, method, params, data, headers }) {
    try {
      const res = await _axios.request({
        url,
        method,
        params,
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
          ...(await api.getAuthorizeHeader()),
          ...headers,
        },
      });

      return { data: res.data, status: res.status };
    } catch (ex) {
      throw ex;
    }
  }

  static async get(url, params) {
    return await api.send({ method: "GET", url, params });
  }

  static async del(url, params, data) {
    return await api.send({ method: "DELETE", url, params, data });
  }

  static async post(url, data, params, headers) {
    return await api.send({ method: "POST", url, data, params, headers });
  }

  static async put(url, data, params, headers) {
    return await api.send({ method: "PUT", url, data, params, headers });
  }

  static async patch(url, data, params, headers) {
    return await api.send({ method: "PATCH", url, data, params, headers });
  }

  static async fileForm(url, file, method, params) {
    let formData = new FormData();
    formData.append("image", file);

    return await api.send({
      url,
      method: method || "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      params: params,
    });
  }
}

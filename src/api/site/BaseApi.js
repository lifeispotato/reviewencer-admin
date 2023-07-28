import api from "../api.js";

export default class BaseApi {
  static async Get(data) {
    return await api.get(`admin/baseInfo`, data);
  }

  static async Put(data) {
    return await api.put(`admin/baseInfo`, data);
  }
}

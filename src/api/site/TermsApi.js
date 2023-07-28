import api from "../api.js";

export default class TermsApi {
  static async GetList(data) {
    return await api.get(`admin/terms`, data);
  }

  static async GetInfo(id) {
    return await api.get(`admin/terms/${id}`);
  }

  static async Put(id, data) {
    return await api.put(`admin/terms/${id}`, data);
  }

  static async Post(data) {
    return await api.post(`admin/terms`, data);
  }
}

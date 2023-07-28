import api from "../api.js";

export default class MarketingApi {
  static async GetList(data) {
    return await api.get(`admin/marketings`, data);
  }

  static async GetInfo(id) {
    return await api.get(`admin/marketing/${id}`);
  }

  static async Put(id, data) {
    return await api.put(`admin/marketing/${id}`, data);
  }

  static async Del(data) {
    return await api.del(`admin/marketings`, data);
  }

  static async Post(data) {
    return await api.post(`admin/marketing`, data);
  }
}

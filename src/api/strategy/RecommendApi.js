import api from "../api.js";

export default class RecommendApi {
  static async GetList(data) {
    return await api.get(`admin/recommends`, data);
  }

  static async GetInfo(id) {
    return await api.get(`admin/recommend/${id}`);
  }

  static async Put(id, data) {
    return await api.put(`admin/recommend/${id}`, data);
  }

  static async Del(data) {
    return await api.del(`admin/recommends`, data);
  }
}

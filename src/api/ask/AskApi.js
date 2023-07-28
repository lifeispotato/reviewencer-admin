import api from "../api.js";

export default class AskApi {
  static async GetList(data) {
    return await api.get(`admin/asks`, data);
  }

  static async GetInfo(id) {
    return await api.get(`admin/ask/${id}`);
  }

  static async Del(data) {
    return await api.del(`admin/asks`, data);
  }
}

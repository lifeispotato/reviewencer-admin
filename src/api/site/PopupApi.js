import api from "../api.js";

export default class PopupApi {
  static async GetList(data) {
    return await api.get(`admin/popups`, data);
  }

  static async GetInfo(id) {
    return await api.get(`admin/popup/${id}`);
  }

  static async Put(id, data) {
    return await api.put(`admin/popup/${id}`, data);
  }

  static async Post(data) {
    return await api.post(`admin/popup`, data);
  }

  static async PutActivation(id, data) {
    return await api.put(`admin/popup/activation/${id}`, data);
  }

  static async Del(data) {
    return await api.del(`admin/popups`, data);
  }
}

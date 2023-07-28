import api from "../api.js";

export default class ManagerApi {
  static async GetList(data) {
    return await api.get(`admin/managers`, data);
  }

  static async GetInfo(id) {
    return await api.get(`admin/manager/${id}`);
  }

  static async PutActivation(id, data) {
    return await api.put(`admin/manager/activation/${id}`, data);
  }

  static async PutApprove(id) {
    return await api.put(`admin/manager/approve/${id}`);
  }

  static async Del(data) {
    return await api.del(`admin/managers`, data);
  }

  static async EditInfo(id, data) {
    return await api.put(`admin/manager/${id}`, data);
  }
  
   static async Join(data) {
    return await api.post(`/manager`, data);
  }

  static async Login(data) {
    return await api.post(`/login/manager`, data);
  }
}

import api from "../api.js";

export default class IpApi {
  static async GetList(data) {
    return await api.get(`admin/visitor/ip`, data);
  }
}

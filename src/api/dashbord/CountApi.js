import api from "../api";

export default class CountApi {
  static async GetVisitor(data) {
    return await api.get(`admin/visitors`, data);
  }
}

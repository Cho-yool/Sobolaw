import { mainAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = mainAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

export async function getLawDetail(params?: { precedentId: number }) {
  const url = "/law-service/precedent/detail/64437";
  return await http.get(url);
}

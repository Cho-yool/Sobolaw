import { userAxios } from "./http";
import { AxiosHeaders } from "axios";
import { useQuery } from "react-query";

const http = userAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

export async function getLawDetail(params?: { precedentId: number }) {
  const url = "/law-service/precedent/detail/64437";
  return await http.get(url);
}

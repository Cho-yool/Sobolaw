import { userAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = userAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "members/";

// 멤버 정보 조회
async function getUserInfo(params: { memberId: number }) {
  const response = await http.get(url + { params });
  return response.data.data;
}

// 멤버가 저장한 판례 조회
async function getPrecedents(params: { memberId: number }) {
  const response = await http.get(url + { params } + "precedents");
  return response.data.data;
}

// 멤버가 최근 본 판례
async function getRecentPrecedents(params: { memberId: number }) {
  const response = await http.get(url + { params } + "recent");
  return response.data.data;
}

export { getUserInfo, getPrecedents, getRecentPrecedents };

// async function getUserInfo(
//   params: {
//       page?: number;
//       size?: number;
//   },
//   accessToken: string
// ) {
//   const response = await http.get(`${url}/${params}`, {
//       params: params,
//       headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + accessToken,
//       },
//   });
//   return response.data.data;
// }

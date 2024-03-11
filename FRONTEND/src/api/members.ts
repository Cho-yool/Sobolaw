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

// 키워드 저장
async function postMyKeyword(memberId: number, keywords: string[]) {
  await http.post(`${url}/${memberId}/keywords`, { keywords });
}
// async function postMyKeyword(memberId: number, accessToken: string) {
//   await http.post(`${url}/${blockedId}`, {
//       headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer " + accessToken
//       }
//   });
// }

// 관리자용 API
// 멤버 전체 리스트 조회
async function getMemberList() {
  const response = await http.get(url);
  return response.data.data;
}

export {
  getUserInfo,
  getPrecedents,
  getRecentPrecedents,
  getMemberList,
  postMyKeyword,
};

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

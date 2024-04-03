import { userAxios } from "./http";
import { AxiosHeaders } from "axios";
import { DefamationForm, InsultForm, submitType } from "../types/DataTypes";

const http = userAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "lawsuit";

// 마이페이지
// 멤버의 소장 리스트 조회
async function getLawsuitList(accessToken: string) {
  const response = await http.get(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// // 모욕죄
// const insult = "insult";

// 멤버의 모욕죄 소장 추가
async function postInsult(accessToken: string, data: submitType) {
  await http.post(`${url}/insults`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 멤버의 특정 모욕죄 소장 조회
async function getInsult(insultId: number, accessToken: string) {
  const response = await http.get(`${url}/insults/${insultId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 멤버의 특정 모욕죄 소장 수정
async function patchInsult(
  insultId: number,
  data: InsultForm,
  accessToken: string
) {
  await http.patch(`${url}/insults/${insultId}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 멤버의 특정 모욕죄 소장 삭제
async function deleteInsult(insultId: number, accessToken: string) {
  await http.delete(`${url}/insults/${insultId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 멤버의 사기죄 소장 추가
async function postFraud(accessToken: string, data: submitType) {
  await http.post(`${url}/frauds`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// // 명예훼손죄
// const defamation = "defamation";

// 멤버의 명예훼손 소장 추가
async function postDefamation(memberId: number, data: DefamationForm) {
  await http.post(`${url}/defamations`, data);
}

// 유저에게 소장 메일 전송
async function postMail(file: FormData, accessToken: string) {
  const response = await http.post(`mail/lawsuits`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}

// 관리자용
// 작성된 소장 전체 조회
async function getLawsuitAll() {
  const response = await http.get(`${url}/list`);
  return response.data.data;
}

export {
  getLawsuitList,
  postDefamation,
  postFraud,
  postInsult,
  getInsult,
  patchInsult,
  deleteInsult,
  getLawsuitAll,
  postMail,
};

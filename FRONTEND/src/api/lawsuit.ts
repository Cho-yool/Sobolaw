import { userAxios } from "./http";
import { AxiosHeaders } from "axios";
import { DefamationForm, FraudForm, InsultForm } from "../types/DataTypes";

const http = userAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "lawsuit";
const testToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLquYDtmITsp4AiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjEwLCJpYXQiOjE3MTEzMzk3NTcsImV4cCI6MTcxMjIwMzc1N30.kWJxKdwCu5WTN8CwbzRdxKkTyZZ6zx0xVIlcVm-gM-2OV_WtD5dq1i2K48v6nVTCnxGc7EuBoHFXoim-Z0ZXug";

// 마이페이지
// 멤버의 소장 리스트 조회
async function getLawsuitList(accessToken: string) {
  const response = await http.get(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
  return response.data.data;
}

// // 모욕죄
// const insult = "insult";

// 멤버의 모욕죄 소장 추가
async function postInsult(accessToken: string, data: InsultForm) {
  await http.post(`${url}/insults`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
}

// 멤버의 특정 모욕죄 소장 조회
async function getInsult(insultId: number, accessToken: string) {
  const response = await http.get(`${url}/insults/${insultId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
  return response.data.data;
}

// 멤버의 특정 모욕죄 소장 수정
async function patchInsult(insultId: number, accessToken: string) {
  await http.patch(`${url}/insults/${insultId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
}

// 멤버의 특정 모욕죄 소장 삭제
async function deleteInsult(insultId: number, accessToken: string) {
  await http.delete(`${url}/insults/${insultId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
}

// // 사기죄
// const fraud = "fraud";

// 멤버의 사기죄 소장 추가
async function postFraud(memberId: number, data: FraudForm) {
  await http.post(`${url}/frauds/${memberId}`, data);
}

// // 명예훼손죄
// const defamation = "defamation";

// 멤버의 명예훼손 소장 추가
async function postDefamation(memberId: number, data: DefamationForm) {
  await http.post(`${url}/defamations/${memberId}`, data);
}

export {
  getLawsuitList,
  postDefamation,
  postFraud,
  postInsult,
  getInsult,
  patchInsult,
  deleteInsult,
};

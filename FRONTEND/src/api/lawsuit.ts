import { userAxios } from "./http";
import { AxiosHeaders } from "axios";
import { DefamationForm, FraudForm, InsultForm } from "../types/DataTypes";

const http = userAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "lawsuit";

// 마이페이지
// 멤버의 소장 리스트 조회
async function getLawsuitList(memberId: number) {
  const response = await http.get(`${url}/${memberId}`);
  return response.data.data;
}

// // 모욕죄
// const insult = "insult";

// 멤버의 모욕죄 소장 추가
async function postInsult(memberId: number, data: InsultForm) {
  await http.post(`${url}/insults/${memberId}`, data);
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

export { getLawsuitList, postDefamation, postFraud, postInsult };

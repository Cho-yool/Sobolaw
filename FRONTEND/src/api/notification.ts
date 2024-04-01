import { notificationAxios } from "./http";
import { NotificationData } from "../types/DataTypes";
import { AxiosHeaders } from "axios";

const http = notificationAxios();

const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

// 토큰 저장
async function postTokens(memberId: number, token: unknown) {
  await http.post(`tokens`, { memberId, token });
}

// 토큰 확인
async function getTokens(memberId: number) {
  const response = await http.get(`tokens/${memberId}`);
  return response.data.data;
}

// 알림 전송
async function postNotifications(data: NotificationData) {
  const response = await http.post("notifications", data);
  return response.data;
}

export { postTokens, getTokens, postNotifications };

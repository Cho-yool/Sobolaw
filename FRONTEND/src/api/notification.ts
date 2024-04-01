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

// 알림목록반환
async function getNotifications(memberId: number) {
  const response = await http.get(`notifications/${memberId}`);
  return response.data.data;
}

// 알림 읽음 처리
async function patchNotification(notificationId: number) {
  await http.patch(`notifications/${notificationId}`);
}

// 알림 삭제 처리
async function delNotification(notificationId: number) {
  await http.delete(`notifications/${notificationId}`);
}

export {
  postTokens,
  getTokens,
  postNotifications,
  getNotifications,
  patchNotification,
  delNotification,
};

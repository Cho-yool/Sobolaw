import { mainAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = mainAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

export async function getLawDetail(params: number) {
  const url = `/law-service/precedents/detail/${params}`;
  return await http.get(url);
}

export async function getLawDetailSummary(params?: { precedentId: number }) {
  const url = "/ai-service/summarys/64453";
  return await http.get(url);
}

export async function saveLawDetail(precedentId: number) {
  const url = `/user-service/members/precedents`;
  return await http.post(
    url,
    {
      precedentId: precedentId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjE4LCJpYXQiOjE3MTEzNTczMjMsImV4cCI6MTcxMjIyMTMyM30.DPykTxXmhykv_raR_45OEnqghrVqhb3w0F3D6iTGRo6v56vUjQrPvlPvScDc9gIwuPNHlTLpPfrRrJCUxN1yNQ`,
      },
    }
  );
}

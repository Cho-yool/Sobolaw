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
  console.log(precedentId);
  return await http.post(
    url,
    {
      precedentId: precedentId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjE4LCJpYXQiOjE3MTEzODcxMDIsImV4cCI6MTcxMjI1MTEwMn0.RkQVC095BRBw8Ldo2kwTljfxl0sgp7jBlSe6Z45gBhpi0FWG5nemiV03BbQpC7-IjiLgQ_8rjq8zkiN1Y-UwVg`,
      },
    }
  );
}

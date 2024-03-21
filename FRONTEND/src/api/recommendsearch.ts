import { recommendAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = recommendAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

// 추천 검색
async function searchPrecedents(situation: string) {
    const response = await http.post("/precedents", {situation});
    return response.data;
}

export { searchPrecedents };
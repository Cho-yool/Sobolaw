import { lawAxios } from "./http";
import { AxiosHeaders } from "axios"

const http = lawAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

// 법령 검색
async function searchStatute(searchKeyword: string) {
  const response = await http.get(`/statutes/search/${searchKeyword}`);
  return response.data;
}

// 법령 상세 조회
async function getStatuteDetail(statuteNumber: number) {
    const response = await http.get(`/statutes/detail/${statuteNumber}`);
    return response.data;
}


// 판례 목록 조회
async function getPrecedentList() {
    const response = await http.get("/precedents/list");
    return response.data.data;
}

// 조회수별 판례 목록 조회
async function getHitPrecedentList() {
    const response = await http.get("/precedents/list"); 
    return response.data.data;
}

// 판례 검색
async function searchPrecedent(searchKeyword: string) {
    const response = await http.get(`/precedents/search/${searchKeyword}`);
    return response.data;
}

export { searchStatute, getPrecedentList, getHitPrecedentList, searchPrecedent };
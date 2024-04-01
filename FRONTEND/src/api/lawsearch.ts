import { lawAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = lawAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

// 법령 검색
async function searchStatute(searchKeyword: string, pageNumber: number) {
    const response = await http.get(`/statutes/search/${searchKeyword}?pageNumber=${pageNumber}`);
    return response.data;
}

// 법령 상세 조회
async function getStatuteDetail(statuteNumber: number) {
    try {
        const response = await http.get(`/statutes/detail/${statuteNumber}`);
        // console.log('법령 상세 조회:', response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('법령 상세 정보 요청 오류:', error);
    }
}

// 판례 검색
async function searchPrecedent(searchKeyword: string, pageNumber: number) {
    const response = await http.get(`/precedents/search/${searchKeyword}?pageNumber=${pageNumber}`);
    // console.log('판례 검색 결과:', response.data, pageNumber);
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

// 조회수별 법령 목록 조회
async function getHitStatuteList() {
    const response = await http.get("/statutes/list");
    return response.data.data;
}

// 뉴스 목록 조회
async function getNewsList(searchKeyword: string) {
    const response = await http.get(`/news/search/${searchKeyword}`);
    // console.log('뉴스 목록 조회:', response.data);
    return response.data.items;
}

// 법령 용어명 목록 조회
async function getAllWords() {
    const response = await http.get("/terms/words");
    console.log('법령 용어명 목록 조회:', response.data);
    return response.data;
}

export { searchStatute, getStatuteDetail, getPrecedentList, getHitPrecedentList, getHitStatuteList, searchPrecedent, getNewsList, getAllWords };

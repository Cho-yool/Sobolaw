import axios from "axios";

const BASEURL = "j10a604.p.ssafy.io/api/";
// withCredentials의 디폴트는 false
// true로 변경하면 1. CORS 요청을 허용 2. 쿠키값을 전달 할 수 있게 됨
// const credential = true;

// 중앙 axios를 선언하고, 사이트명/경로에 따라 api 문서를 나눠서 사용
function mainAxios() {
  return axios.create({
    // baseURL: "https://" + BASEURL,
    baseURL: "https://" + BASEURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // withCredentials: credential,
  });
}

// https://j10a604.p.ssafy.io/api/user-service/swagger-ui/index.html
// 재성이 파트
function userAxios() {
  return axios.create({
    // baseURL: "https://" + BASEURL,
    baseURL: "https://" + BASEURL + "user-service/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // withCredentials: credential,
  });
}

// https://j10a604.p.ssafy.io/api/law-service/swagger-ui/index.html
// 소영 파트
function lawAxios() {
  return axios.create({
    // baseURL: "https://" + BASEURL,
    baseURL: "https://" + BASEURL + "law-service/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // withCredentials: credential,
  });
}
// https://j10a604.p.ssafy.io/api/recommend-service/swagger-ui.html
// 종범 파트
function recommendAxios() {
  return axios.create({
    // baseURL: "https://" + BASEURL,
    baseURL: "https://" + BASEURL + "recommend-service/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // withCredentials: credential,
  });
}

export { mainAxios, userAxios, lawAxios, recommendAxios };

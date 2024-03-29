import axios from "axios";

const BASEURL = "j10a604.p.ssafy.io/api/";

// 중앙 axios를 선언하고, 사이트명/경로에 따라 api 문서를 나눠서 사용
function mainAxios() {
  return axios.create({
    baseURL: "https://" + BASEURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

// https://j10a604.p.ssafy.io/api/user-service/swagger-ui/index.html
// 재성이 파트
function userAxios() {
  return axios.create({
    baseURL: "https://" + BASEURL + "user-service/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

// 재성이 로컬
function localuserAxios() {
  return axios.create({
    baseURL: "http://70.12.247.27:8001/api/user-service/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
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
  });
}

// https://j10a604.p.ssafy.io/api/board-service/swagger-ui.html
// 종범 파트
function boardAxios() {
  return axios.create({
    // baseURL: "https://" + BASEURL,
    baseURL: "https://" + BASEURL + "board-service/",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

export { mainAxios, userAxios, lawAxios, recommendAxios, localuserAxios, boardAxios };

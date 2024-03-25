import { userAxios, localuserAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = userAxios();
const testHttp = localuserAxios();

const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "members";
const testToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLquYDtmITsp4AiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjEwLCJpYXQiOjE3MTEzMzk3NTcsImV4cCI6MTcxMjIwMzc1N30.kWJxKdwCu5WTN8CwbzRdxKkTyZZ6zx0xVIlcVm-gM-2OV_WtD5dq1i2K48v6nVTCnxGc7EuBoHFXoim-Z0ZXug";

// reissue token
async function reissueToken(accessToken: string, refreshToken: string) {
  const response = await http.post("token/refresh", refreshToken, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  const responseData = response.data;
  if (responseData.status == 401) {
    alert("세션이 만료되었습니다! 재로그인해주세요");
  } else {
    return responseData.data;
  }
}

// 멤버 정보 조회
async function getUserInfo(accessToken: string) {
  const response = await http.get(`${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
  return response.data.data;
}

// 로그아웃
async function postLogout(accessToken: string, refreshToken: string) {
  console.log(accessToken);
  const response = await http.post(`${url}/logout`, refreshToken, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 회원탈퇴
async function deleteUser(accessToken: string) {
  await http.delete(`${url}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 멤버가 저장한 판례 조회
async function getPrecedents(accessToken: string) {
  const response = await http.get(`${url}/precedents`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${testToken}`,
    },
  });
  return response.data.data;
}

// 멤버가 최근 본 판례
async function getRecentPrecedents(memberId: number) {
  const response = await http.get(`${url}/${memberId}/recent`);
  return response.data.data;
}

// 키워드 저장
async function postMyKeyword(accessToken: string, words: string[]) {
  await http.post(
    `${url}/keywords`,
    { words },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// 관리자용 API
// 멤버 전체 리스트 조회
async function getMemberList() {
  const response = await http.get(url);
  return response.data.data;
}

export {
  reissueToken,
  getUserInfo,
  getPrecedents,
  getRecentPrecedents,
  getMemberList,
  postMyKeyword,
  postLogout,
  deleteUser,
};

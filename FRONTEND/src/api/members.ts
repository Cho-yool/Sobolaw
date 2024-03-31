import { updateToken } from "../redux/reducers/user/userSlice";
import { store } from "../redux/store/store";
import { userAxios } from "./http";
import { AxiosError, AxiosHeaders, AxiosRequestHeaders } from "axios";

const http = userAxios();

const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "members";

// 요청 응답 가로채서 토큰 재발급 시키기
http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const err = error as AxiosError;
    if (err.response?.status === 401) {
      const state = store.getState();
      const accessToken = state.accessToken;
      const refreshToken = state.refreshToken;
      // 토큰 만료 시 토큰을 다시 발급
      const { newAccessToken } = await reissueToken(accessToken, refreshToken);
      // store 갱신
      store.dispatch(updateToken(newAccessToken));
      // 새로 발급받은 토큰으로 요청 다시 시도
      if (err.config && newAccessToken) {
        err.config.headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        } as AxiosRequestHeaders; // 타입 단언 사용
        return http(err.config);
      }
    }
    return Promise.reject(error);
  }
);

// reissue token
async function reissueToken(accessToken: string, refreshToken: string) {
  const response = await http.post("token/refresh", refreshToken, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
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
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 로그아웃
async function postLogout(accessToken: string, refreshToken: string) {
  const response = await http.post(`${url}/logout`, refreshToken, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 회원탈퇴
async function deleteUser(accessToken: string, refreshToken: string) {
  await http.delete(`${url}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
}

// 멤버가 저장한 판례 조회
async function getPrecedents(accessToken: string) {
  const response = await http.get(`${url}/precedents`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 멤버가 저장한 판례 삭제
async function delPrecedents(accessToken: string, precedentId: number) {
  await http.delete(`${url}/precedents/${precedentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 멤버가 조회한 판례를 '최근 본 판례'로 저장
async function postRecentPrecedents(accessToken: string, precedentId: number) {
  await http.post(
    `${url}/recents`,
    { precedentId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// 멤버가 최근 본 판례 리스트 조회
async function getRecentPrecedents(accessToken: string) {
  const response = await http.get(`${url}/recents`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 키워드 저장
async function postMyKeyword(accessToken: string, words: string[]) {
  await http.patch(
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

// 파일 업로드 및 원본파일 이름 저장(한 장)
async function postImage(accessToken: string, data: FormData) {
  await http.post(`media/image`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 변호사 전환(등업) 요청
async function postApplyLawyer(accessToken: string, image: string) {
  await http.post(
    `${url}/certification/lawyer`,
    { image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

// 관리자용 API
// 멤버 전체 리스트 조회
async function getMemberList(accessToken: string) {
  const response = await http.get(`${url}/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 멤버 상세 조회
async function getMemberDetail(accessToken: string, memberId: number) {
  const response = await http.get(`${url}/${memberId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 멤버 정보 수정
async function patchMemberDetail(
  accessToken: string,
  data: { name: string; email: string; role: string },
  memberId: number
) {
  const response = await http.patch(`${url}/${memberId}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 전체 저장 판례 조회
async function getPrecedentsList(accessToken: string) {
  const response = await http.get(`${url}/precedents/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 전체 관심 키워드 조회
async function getKeywordList(accessToken: string) {
  const response = await http.get(`${url}/keywords/list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 변호사 신청 리스트 조회
async function getLawyerList(accessToken: string) {
  const response = await http.get(`${url}/certification/lawyer`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 변호사 신청글 상세 조회
async function getLawyerDetail(accessToken: string, articleId: string) {
  const response = await http.get(`${url}/certification/lawyer/${articleId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data.data;
}

// 변호사 등업 승인(??인데 멤버 정보 수정patch 써도 ㄱㅊ을 거 같아요)
async function postApproveLawyer(accessToken: string, articleId: string) {
  await http.post(`${url}/certification/lawyer/${articleId}/approve`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export {
  reissueToken,
  getUserInfo,
  getPrecedents,
  postRecentPrecedents,
  getRecentPrecedents,
  getMemberList,
  postMyKeyword,
  postLogout,
  deleteUser,
  delPrecedents,
  getPrecedentsList,
  postImage,
  getMemberDetail,
  patchMemberDetail,
  getKeywordList,
  postApplyLawyer,
  getLawyerList,
  getLawyerDetail,
  postApproveLawyer,
};

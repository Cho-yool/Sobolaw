import { mainAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = mainAxios();

const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

// 판례 상세 조회
export async function getLawDetail(params: number) {
  const url = `/law-service/precedents/detail/${params}`;
  return await http.get(url);
}

// 판례 요약 조회
export async function getLawDetailSummary(params: number) {
  const url = `/ai-service/summarys/${params}`;
  return await http.get(url);
}

export async function saveLawDetail(accessToken: string, precedentId: number) {
  const url = `/user-service/members/precedents`;
  return await http.post(
    url,
    {
      precedentId: precedentId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export async function deletePrecedent(
  accessToken: string,
  precedentId: number
) {
  const url = `/user-service/members/precedents/${precedentId}`;
  const response = await http.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const deleteUrl = `/user-service/members/precedents/${response.data.memberPrecedentId}`;

  return await http.delete(deleteUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// export async function findHighLight(precedentId: number) {

// }

interface HighLightProps {
  precedentId: number;
  main: string;
  highlightType: number;
  startPoint: number;
  endPoint: number;
  content: string;
}

export async function getHighLight(accessToken: string, precedentId: number) {
  const url = `/user-service/members/precedents/${precedentId}/highlights`;

  return await http.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function saveHighLight(
  {
    precedentId,
    main,
    highlightType,
    startPoint,
    endPoint,
    content,
  }: HighLightProps,
  accessToken: string
) {
  const url = `/user-service/members/precedents/${precedentId}/highlights`;

  return await http.post(
    url,
    {
      main,
      startPoint,
      endPoint,
      highlightType,
      content,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

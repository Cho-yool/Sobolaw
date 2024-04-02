import { lawAxios, mainAxios } from "./http";
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
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9BRE1JTiIsIm1lbWJlcklkIjoxOCwiaWF0IjoxNzEyMDQyMjQ3LCJleHAiOjE3MTIwNDI4NDd9.XOuwy2aOuBSiztvRp3SFKwOgF9exJbCQGqjachH9RSteKZ-FvTgvZQGBZ7my2L8PB4vI2wJLgEb26BMMMQL3yw`,
      },
    }
  );
}

export async function deletePrecedent(precedentId: number) {
  const url = `/user-service/members/precedents/${precedentId}`;
  const response = await http.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9BRE1JTiIsIm1lbWJlcklkIjoxOCwiaWF0IjoxNzEyMDQyMjQ3LCJleHAiOjE3MTIwNDI4NDd9.XOuwy2aOuBSiztvRp3SFKwOgF9exJbCQGqjachH9RSteKZ-FvTgvZQGBZ7my2L8PB4vI2wJLgEb26BMMMQL3yw`,
    },
  });
  console.log(response);

  // await http.delete(url, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9BRE1JTiIsIm1lbWJlcklkIjoxOCwiaWF0IjoxNzEyMDQyMjQ3LCJleHAiOjE3MTIwNDI4NDd9.XOuwy2aOuBSiztvRp3SFKwOgF9exJbCQGqjachH9RSteKZ-FvTgvZQGBZ7my2L8PB4vI2wJLgEb26BMMMQL3yw`,
  //   },
  // });
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

export async function getHighLight(precedentId: number) {
  const url = `/user-service/members/precedents/${precedentId}/highlights`;

  return await http.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjE4LCJpYXQiOjE3MTE0NjEwMDUsImV4cCI6MTcxMjMyNTAwNX0.6HWhADwXr4nZelG8QpKP37Mwe-WVj1_pULlad_nuGsNELyWU73nMbMLnhOYk2a5Zs00wXTonh5LQ4J8Lo7JhXg`,
    },
  });
}

export async function saveHighLight({
  precedentId,
  main,
  highlightType,
  startPoint,
  endPoint,
  content,
}: HighLightProps) {
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
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLqt7zsmIEiLCJyb2xlIjoiUk9MRV9VU0VSIiwibWVtYmVySWQiOjE4LCJpYXQiOjE3MTE0NjEwMDUsImV4cCI6MTcxMjMyNTAwNX0.6HWhADwXr4nZelG8QpKP37Mwe-WVj1_pULlad_nuGsNELyWU73nMbMLnhOYk2a5Zs00wXTonh5LQ4J8Lo7JhXg`,
      },
    }
  );
}

import { mainAxios } from "./http";

const http = mainAxios();
const url = "/example";

// 어쩌구 함수
async function getExample(params: {
  test1: string;
  test2: number;
  test3: number;
}) {
  const response = await http.get(url + "/example", { params });
  return response.data;
}

export { getExample };

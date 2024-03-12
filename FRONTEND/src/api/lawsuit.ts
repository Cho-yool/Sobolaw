import { userAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = userAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

const url = "lawsuit/";

// // 모욕죄
// const insult = "insult";
// // 사기죄
// const fraud = "fraud";
// // 명예훼손죄
// const defamation = "defamation";

// 멤버의 소장 리스트 조회
async function getLawsuitList(memberId: number) {
  const response = await http.get(`${url}/${memberId}`);
  return response.data.data;
}

export { getLawsuitList };

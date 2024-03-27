import { mainAxios, lawAxios } from "./http";
import { AxiosHeaders } from "axios";

const http = mainAxios();
const lawHttp = lawAxios();
const headers = new AxiosHeaders();
headers.set("Content-Type", "application/json;charset=utf-8");

export async function getChatAnswer(message: string) {
  const data = {
    messages: [
      {
        role: "system",
        content: "반말로 대답해줘",
      },
      {
        role: "user",
        content: message,
      },
    ],
  };
  const url = "/ai-service/chat-bot";
  return await http.post(url, data);
}

export function getWordList(page = 1) {
  const url = `terms/list?page=${page}`;
  return lawHttp.get(url);
}

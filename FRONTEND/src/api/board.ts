import { boardAxios } from "./http";
import { AxiosHeaders } from "axios";
import { DefamationForm, FraudForm, InsultForm } from "../types/DataTypes";

const http = boardAxios();
const board = "boards";
const comment = "comments";

// 게시판 목록 조회
async function getBoardList() {
  const response = await http.get(`${board}`);
  return response.data.data;
}

// 게시물 상세 조회
async function getBoard(boardId: number) {
  const response = await http.get(`${board}/${boardId}`);
  return response.data.data;
}

// 게시물 생성
async function registerBoard(data: Object) {
  const response = await http.post(`${board}`, data);
  return response.data.data;
}

// 게시물 수정
async function updateBoard(data: Object) {
  const response = await http.patch(`${board}`, data);
  return response.data.data;
}

// 게시물 삭제
async function deleteBoard(boardId: number) {
  const response = await http.delete(`${board}/${boardId}`);
  return response.data.data;
}

// --------------------------------------------------------------------------------

// 댓글 생성
async function registerComment(data: Object) {
  const response = await http.post(`${comment}`, data);
  return response.data.data;
}

// 댓글 수정
async function updateComment(data: Object) {
  const response = await http.patch(`${comment}`, data);
  return response.data.data;
}

// 댓글 삭제
async function deleteComment(commentId: number) {
  const response = await http.delete(`${comment}/${commentId}`);
  return response.data.data;
}
export {
  getBoardList,
  getBoard,
  registerBoard,
  updateBoard,
  deleteBoard,
  registerComment,
  updateComment,
  deleteComment,
};

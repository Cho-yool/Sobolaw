import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../types/DataTypes";

const initialState: UserState = {
  userId: 0,
  nickname: "",
  accessToken: "",
  refreshToken: "",
  precedents: [],
  auth: "",
};

// 초기값 선언
const userSlice = createSlice({
  name: "user",
  initialState,

  // 액션 리듀서(함수)
  reducers: {
    // 초기화 함수
    resetAuth: (state) => {
      state.userId = 0;
      state.nickname = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.precedents = [];
      state.auth = "";
    },
    // 처음 user의 정보를 저장하는 함수
    loadInfo(state, action) {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.precedents = action.payload.precedents;
      state.auth = action.payload.auth;
    },
    saveToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateToken(state, action) {
      state.accessToken = action.payload;
    },
    updatePrecedents(state, action) {
      state.precedents = action.payload;
    },
  },
});

export const { loadInfo, resetAuth, saveToken, updateToken, updatePrecedents } =
  userSlice.actions;
export default userSlice.reducer;

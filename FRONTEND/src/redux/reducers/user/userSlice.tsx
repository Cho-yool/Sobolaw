import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../types/DataTypes";

const initialState: UserState = {
  userId: 0,
  nickname: "",
  accessToken: "",
  refreshToken: "",
};

// 초기값 선언
const userSlice = createSlice({
  name: "user",
  initialState,

  // 액션 리듀서(함수)
  reducers: {
    // 초기화 함수
    resetAuth: (state) => {
      state.accessToken = "";
    },
    // 처음 user의 정보를 저장하는 함수
    loadInfo(state, action) {
      state.userId = action.payload.id;
      state.nickname = action.payload.nickname;
    },
    saveToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { loadInfo, resetAuth, saveToken } = userSlice.actions;
export default userSlice.reducer;

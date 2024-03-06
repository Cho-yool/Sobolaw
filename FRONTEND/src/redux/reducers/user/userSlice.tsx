import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../types/DataTypes";

const initialState: UserState = {
  userId: 0,
  nickname: "",
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.accessToken = "";
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(
  //       //
  //     )
  // },
});

// export const { login } = userSlice.actions;
export const { resetAuth } = userSlice.actions;
export default userSlice.reducer;

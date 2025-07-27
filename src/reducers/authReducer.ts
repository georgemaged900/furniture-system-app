import { createSlice } from "@reduxjs/toolkit";
//import { IUser } from "../models/IUser";

type ActivityState = {
  //user: IUser | null;
  token: string;
};

const initialState: ActivityState = {
  //user: null,
  token: "",
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
     // state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerAction: (state, action) => {
      //state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.token = "";
    //  state.user = null;
    },
  },
});

export const { loginAction, registerAction, logoutAction } = authReducer.actions;

export default authReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
//import { ILanguage } from "../types/common";

type GeneralState = {
  alertMessage: string;
  alertType: "success" | "error";
 // languages: ILanguage[];
};

const initialState: GeneralState = {
  alertMessage: "",
  alertType: "error",
  //languages: [],
};

export const generalReducer = createSlice({
  name: "general",
  initialState,
  reducers: {
    setGeneralAlertMessage: (state, action) => {
      state.alertMessage = action.payload.message;
      state.alertType = action.payload.type;
    },
    clearAlert: (state) => {
      state.alertMessage = "";
      state.alertType = "error";
    },
    
  },
});

export const { setGeneralAlertMessage, clearAlert } = generalReducer.actions;

export default generalReducer.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastState = {
  message: string;
  type: "success" | "error";
  visible: boolean;
};

const initialState: ToastState = {
  message: "",
  type: "success",
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.visible = true;
    },

    hideToast: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
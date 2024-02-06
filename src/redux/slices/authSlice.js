import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  openLogin: false, //модальный окно состояниясы
  openRegister: false, //модальный окно состояниясы
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoginModal: (state, action) => {
      state.openLogin = action.payload; // false true келет
      state.openRegister = false; //ал ачылса бул жабык болуш керек
    },
    toggleRegisterModal: (state, action) => {
      state.openRegister = action.payload; // false true
      state.openLogin = false; //ал ачылса бул жабык болуш керек
    },
    setUser: (state, action) => {
      //getMe запрос келген данныйды сактайбыз
      state.user = action.payload;
    },
  },
});

export const { toggleLoginModal, toggleRegisterModal, setUser } =
  authSlice.actions;

export default authSlice.reducer;

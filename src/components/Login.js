import React, { useState } from "react";
import MyModal from "./MyModal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  toggleLoginModal,
  toggleRegisterModal,
} from "../redux/slices/authSlice";
import { Typography } from "@mui/material";
import { authApi } from "./../services/auth-api";
import Cookies from "js-cookie"; //хранилище браузера - токенди сактап турганы
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openLogin } = useSelector((state) => state.auth);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, isError }] = authApi.useLoginMutation();
  //login - auth-api.js ден келет
  const [getMe, { data: userData }] = authApi.useLazyGetMeQuery(); //Данныйды сосояниеге сактаватабыз

  const handleLogin = async () => {
    try {
      const response = await login({ username, password }).unwrap(); //unwrap - пост запрос озу ушундай жазылат
      Cookies.set("token", response.token, {
        //Хранилищага сактадык токенди
        secure: true, //Скрывает токен(защита)
      });
      await getMe(); //чз авторизац токенге жоноттат и келген данныйды экранга чыгартат
      if (userData) {
        dispatch(setUser(userData?.user)); //если токен совподает тогда авторизация бол
      }
      dispatch(toggleLoginModal(false)); // успешный болсо жабылыш керек
      navigate("/"); //Главный страницага отобуз сразу
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyModal
      handleClose={() => dispatch(toggleLoginModal(false))}
      open={openLogin}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4" component="div">
        Войти
      </Typography>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField
          error={isError}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          id="outlined-basic"
          helperText={isError && "Логин неверный"}
          label="Username"
          variant="outlined"
        />
        <TextField
          error={isError}
          helperText={isError && "Пароль неверный"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button onClick={handleLogin} variant="contained">
          {isLoading ? "Загрузка..." : "Войти"}
        </Button>
        <Button
          onClick={() => dispatch(toggleRegisterModal(true))}
          variant="outlined"
        >
          Если нет аккаунт?
        </Button>
      </form>
    </MyModal>
  );
};

export default Login;

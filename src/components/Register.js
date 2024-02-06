import React, { useState } from "react";
import MyModal from "./MyModal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleRegisterModal,
  toggleLoginModal,
} from "../redux/slices/authSlice";
import { Typography } from "@mui/material";
import { authApi } from "./../services/auth-api";
import Cookies from "js-cookie"; //хранилище браузера - токенди сактап турганы
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openRegister } = useSelector((state) => state.auth);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [register, { data, isLoading, isError }] =
    authApi.useRegisterMutation();
  //login - auth-api.js ден келет

  const handleRegister = async () => {
    try {
      const response = await register({ username, password }).unwrap(); //unwrap - пост запрос озу ушундай жазылат
      Cookies.set("token", response.token); //Хранилищага сактадык токенди
      dispatch(toggleRegisterModal(false)); // успешный болсо жабылыш керек
      navigate("/"); //Главный страницага отобуз сразу
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyModal
      handleClose={() => dispatch(toggleRegisterModal(false))}
      open={openRegister}
    >
      <Typography sx={{ textAlign: "center" }} variant="h4" component="div">
        Регистрация
      </Typography>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <TextField
          id="outlined-basic"
          error={isError}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          label="Username"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          error={isError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
        />
        <Button variant="contained" onClick={handleRegister}>
          {isLoading ? "Загрузка..." : "Регистрация"}
        </Button>
        <Button
          onClick={() => dispatch(toggleLoginModal(true))}
          variant="outlined"
        >
          Если есть аккаунт?
        </Button>
      </form>
    </MyModal>
  );
};
//getMe ни кылыш керек
//постторду home ге чыгарыш керек, если user бар бролгон болсо чыгарыш керек
export default Register;

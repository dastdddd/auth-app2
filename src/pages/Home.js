import React, { useCallback, useEffect } from "react";
import { authApi } from "../services/auth-api";
import { setUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import List from "../components/list";

const Home = () => {
 
  return <div>
    <List/>
  </div>;
};

export default Home;

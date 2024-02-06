import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MyAppbar from './components/appbar';
import Home from './pages/Home';
import MyPost from './pages/MyPost';
import AddPost from './pages/AddPost';
import Register from './components/Register';
import Login from './components/Login';
import Post from './pages/Post';
import './App.css';
import { useEffect, useCallback } from 'react';
import { authApi } from './services/auth-api';
import { setUser } from './redux/slices/authSlice';
import { useDispatch } from 'react-redux';


const App = () => {
  const [getMe, { data: user }] = authApi.useLazyGetMeQuery(); //getMe ден келтат auth-api.js
  const dispatch = useDispatch();

  const load = useCallback(async () => {
    //useCallback функцияны иштебесе кайра кайра чакырбайт
    await getMe(); //Данныйды алып состояниеге(user)ге сактайбыз(профильге киртабыз короче)
  }, [getMe]);

  useEffect(() => {
    load();
    if (user) {
      dispatch(setUser(user.user));
    }
  }, [load, dispatch, user]);


  return (
    <div>
      <MyAppbar/>
      <Login/>
      <Register/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/posts' element={<MyPost/>}/>
        <Route path='/create' element={<AddPost/>}/>
        <Route path='/:id' element={<Post/>}/>
      </Routes>
    </div>
  );
};

export default App;
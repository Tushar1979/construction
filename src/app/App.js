import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import './App.scss';
import axios from 'axios'
import AppRoutes from './AppRoutes';

import useAuth from './component/hooks/useAuth'
import useHttp from './component/hooks/useAxios';
import { useDispatch } from 'react-redux'
import { getUserDetail} from '../redux/slices/HomeSlice'
axios.defaults.baseURL = 'http://192.168.1.211:8000/';


import 'react-toastify/dist/ReactToastify.css';

function App  (){

  // const {userInfo} = useAuth();
  const useaxios = useHttp()
  const dispatch = useDispatch();
  
  // useEffect(()=>{
  
  //   dispatch(getUserDetail(userInfo))
  // },[userInfo])
  
  // const histry = useHistory()
  // console.log(userInfo)
  //  useEffect(()=>{
  //   if(!userInfo ){
  //     histry.push("/login")
  //   }
  //  })

  // console.log(useaxios)

   
  return (
  <>
    <AppRoutes />
  </>
  );
  }

 export default App;

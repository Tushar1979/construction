import {  runGetApi } from "./api";


export const getDesignatedUsersApi = async (reqData) => {

    const apiurl = "user/alluserbydesignation/" + reqData ;
     
    const Result = await runGetApi(apiurl);
  
    return Result;
    
}
import {  runGetApi } from "./api";


export const getOneProjecAssignUsersApi = async (reqData) => {
   
    const apiurl = "project/allUsersOnproject/" + reqData;
     
    const Result = await runGetApi(apiurl);
  
    return Result;
    
}
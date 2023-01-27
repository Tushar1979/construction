import {  runGetApi } from "./api";


export const getOneProjectApi = async (reqData) => {
    
    const apiurl = "project/getOneProject/" + reqData;
     
    const Result = await runGetApi(apiurl);
  
    return Result;
    
}
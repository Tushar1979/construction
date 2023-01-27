import {  runGetApi } from "./api";


export const getOneUserApi = async (reqData) => {
 
    const apiurl = "user/readOneUser/" + reqData;

    const Result = await runGetApi(apiurl);
    return Result;
}







    
    
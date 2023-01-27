import {  runGetApi } from "./api";
const apiurl = "user/readUser";

export const getUserApi = async (reqData) => {
    const Result = await runGetApi(apiurl, reqData);
    return Result;
}




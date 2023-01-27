import {  runPostApi } from "./api";
const apiurl = "user/userCreate";

export const addUserApi = async (ReqData) => {
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}



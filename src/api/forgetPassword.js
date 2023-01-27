import {  runPostApi } from "./api";
const apiurl = "user/forgotPassword";

export const forgetpassword = async (ReqData) => {
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}



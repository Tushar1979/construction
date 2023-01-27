import {  runPostApi } from "./api";
const apiurl = "user/resetPassword";

export const resetpassword = async (ReqData) => {
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}

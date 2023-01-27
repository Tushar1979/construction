
import {  runPostApi } from "./api";
const apiurl = "user/loginUser";

export const loginApi = async (ReqData) => {
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}

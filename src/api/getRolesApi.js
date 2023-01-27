import {  runGetApi } from "./api";
const apiurl = "user/getRole";

export const getRolesApi = async (ReqData) => {
    const Result = await runGetApi(apiurl, ReqData);
    return Result;
}

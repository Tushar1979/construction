import {  runGetApi } from "./api";
const apiurl = "project/allproject";

export const getProjectApi = async (ReqData) => {
    const Result = await runGetApi(apiurl, ReqData);
    return Result;
}
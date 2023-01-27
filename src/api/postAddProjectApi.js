import {  runPostApi } from "./api";
const apiurl = "project/createProject";

export const addProjectApi = async (ReqData) => {
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}
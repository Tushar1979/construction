import {  runPostApi } from "./api";
const apiurl = "project/assignUser/";

export const assignUserToProjectApi = async (id,ReqData) => {
   
    const apiurl = "project/assignUser/" + id;
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}







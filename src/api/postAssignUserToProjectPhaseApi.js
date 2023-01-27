import {  runPostApi } from "./api";
const apiurl = "/phase/assignUser/:";

export const assignUserToProjectPhaseApi = async (id,ReqData) => {
   
    const apiurl = "/phase/assignUser/" + id;
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}







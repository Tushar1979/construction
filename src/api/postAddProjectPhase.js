import {  runPostApi } from "./api";
const apiurl = "phase/createPhase";

export const addProjectPhaseApi = async (name,ReqData) => {
    
    const apiurl = "phase/createPhase/"+name;
    const Result = await runPostApi(apiurl, ReqData);
    return Result;
}



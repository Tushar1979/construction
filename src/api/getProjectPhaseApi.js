
import {  runGetApi } from "./api";


export const getProjectPhaseApi = async (ReqData) => {
    
    const apiurl = "phase/getAllphases/"+ ReqData;
    const Result = await runGetApi(apiurl);
    return Result;

}


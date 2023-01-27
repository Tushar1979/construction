
import {  runGetApi } from "./api";


export const getProjectOnePhase = async (ReqData) => {
    
    const apiurl = "phase/getOnePhaseonProject/"+ ReqData;
    const Result = await runGetApi(apiurl);
    return Result;
}


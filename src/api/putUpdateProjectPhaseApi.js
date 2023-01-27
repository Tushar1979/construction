import { runPutApi } from "./api";


export const editProjectPhaseApi = async (id, reqData) => {
const apiurl = "phase/updateOnePhase/" + id; 

    const Result = await runPutApi(apiurl, reqData);
    return Result;
}


import { runDeleteApi } from "./api";

export const deleteProjectPhaseApi = async (name,reqData) => {
    console.log(name)
const apiurl = "phase/deleteOnePhase/" + name; 

    const Result = await runDeleteApi(apiurl,reqData);
    return Result;
}
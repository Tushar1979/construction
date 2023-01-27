import { runPutApi } from "./api";


export const deleteUserOnProjectPhase = async (id, reqData) => {
    console.log(id, reqData)
const apiurl = "phase/deleteEmployeesonPhase/" + id; 

    const Result = await runPutApi(apiurl, reqData);
    return Result;
}

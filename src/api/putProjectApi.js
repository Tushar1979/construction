import { runPutApi } from "./api";


export const editProjectApi = async (id, reqData) => {
const apiurl = "project/updateOneProject/" + id; 

    const Result = await runPutApi(apiurl, reqData);
    return Result;
}


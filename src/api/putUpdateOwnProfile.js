import { runPutApi } from "./api";


export const editOwnProfileApi = async (id, reqData) => {
const apiurl = "user/UpdateOwnDetails/" + id; 

    const Result = await runPutApi(apiurl, reqData);
    return Result;
}

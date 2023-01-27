import { runPutApi } from "./api";




export const editUserApi = async (id,reqData) => {

const apiurl = "user/updateOneUser/" + id; 

    const Result = await runPutApi(apiurl,reqData);
    return Result;
}


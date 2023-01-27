import { runDeleteApi } from "./api";

export const deleteUserApi = async (reqData) => {
const apiurl = "user/deleteUser/" + reqData; 

    const Result = await runDeleteApi(apiurl);
    return Result;
}


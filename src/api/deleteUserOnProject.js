import { runDeleteApi } from "./api";

export const deleteUserOnProjectApi = async (name,reqData) => {
    console.log(name)
const apiurl = "project/removeUser/" + name; 

    const Result = await runDeleteApi(apiurl,reqData);
    return Result;
}





import { runDeleteApi } from "./api";


  





export const deleteProjectApi = async (reqData) => {
const apiurl = "project/deleteOneProject/" + reqData; 

    const Result = await runDeleteApi(apiurl);
    return Result;
}

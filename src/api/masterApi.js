
import { runGetApi } from "./api";
const tenant_id = "S1ldPTXS32";
const reportAdUrl = tenant_id+"/reports/ads";


/**
 * Master Api Call To reports/ads this url
 * @Note if you are making get api call don't worry directly pass as json data and the program automatically handle it .
 * @param {ReqData} ReqData 
 * @returns 
 */
export const masterApi = async (ReqData) => {
    const Result = await runGetApi(reportAdUrl, ReqData);
    return Result;
}

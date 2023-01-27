// contains all the base GET , POST , PUT and PATCH 

import { runApi } from "./base";

export async function runGetApi(url, data,header={}) {
    const result = await runApi("get", url, data,header);
    return result;
}


export async function runPostApi(url, data,header={}) {
    const result = await runApi("post", url, data, header);
    return result;
}


export async function runDeleteApi(url, data, header={}) {
    const result = await runApi("delete", url, data, header);
    return result;
}


export async function runPatchApi(url, data, header={}) {
    const result = await runApi("patch", url, data, header);
    return result;
}


export async function runPutApi(url, data, header={}) {
    const result = await runApi("put", url, data, header);
    return result;
}
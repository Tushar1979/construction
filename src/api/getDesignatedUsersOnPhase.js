import {  runGetApi } from "./api";


export const getDesignatedUsersOnPhaseApi = async (reqData) => {

    const apiurl = `project/EmployeeOnProjectByDesignation/designation?projectname=${reqData?.projectname}&designation=${reqData?.designation}` ;
     
    const Result = await runGetApi(apiurl);
  
    return Result;
    
}
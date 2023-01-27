import {  runGetApi } from "./api";


export const getOneProjectPhaseAssignUsersApi = async (reqData) => {
   
    const apiurl = "phase/allEmployeesOnPhase/" + reqData;
     
    const Result = await runGetApi(apiurl);
  
    return Result;
    
}
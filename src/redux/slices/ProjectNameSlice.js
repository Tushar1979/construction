import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    ProjectDetail:0
}

export const projectNameSlice =createSlice({
    name : 'projectDeatils',
    initialState,
    reducers : {
       
        getProjectDetail:(state ,actions)=>{
            


            state.ProjectDetail = actions.payload
        },
        

    }
})      

export const {getProjectDetail} = projectNameSlice.actions;

export default projectNameSlice.reducer;
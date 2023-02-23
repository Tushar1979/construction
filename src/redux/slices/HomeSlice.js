import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    userDetail:{},
}

export const homeSlice =createSlice({
    name : 'userDeatils',
    initialState,
    reducers : {
       
        getUserDetail:(state ,actions)=>{
            state.userDetail = actions.payload
        },
        

    }
})      

export const {getUserDetail} = homeSlice.actions;

export default homeSlice.reducer;
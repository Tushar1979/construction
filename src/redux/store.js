import { configureStore,combineReducers } from "@reduxjs/toolkit";
import homeReducer  from '../redux/slices/HomeSlice'
import projectReducer from '../redux/slices/ProjectNameSlice'


const reducer= combineReducers({
    home : homeReducer,
    project : projectReducer
    
})

export const store =configureStore({
    reducer
})




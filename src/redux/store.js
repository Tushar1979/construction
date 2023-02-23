import { configureStore,combineReducers } from "@reduxjs/toolkit";
import homeReducer  from '../redux/slices/HomeSlice'
import projectReducer from '../redux/slices/ProjectNameSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
const persistConfig = {
    key:'root',
    storage
}

const reducer= combineReducers({
    home : homeReducer,
    project : projectReducer
    
})
const persistedReducer = persistReducer(persistConfig,reducer)
export const store =configureStore({
    reducer:persistedReducer
})




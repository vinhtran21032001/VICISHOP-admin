import { configureStore } from "@reduxjs/toolkit";
import productSlice  from '../redux/productRedux';
import userSlice  from '../redux/userRedux';
import {combineReducers} from 'redux'



const rootReduces = combineReducers({
    products : productSlice,
    users : userSlice

})
const store = configureStore({
    reducer: rootReduces,

})
export default store;
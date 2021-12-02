import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : "products",
    initialState : {
        products : [],
        isFetching : false,
        error : false
    },
    reducers :{
        // Get All product
        getProductStart : (state)=>{
            state.isFetching = true;
        },
        getProductFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        getProductSuccess : (state, actions)=> {
            state.products = actions.payload;
            state.isFetching = false;
        },



        // delete
        deleteProductStart : (state)=>{
            state.isFetching = true;
        },
        deleteProductFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        deleteProductSuccess : (state, actions)=> {
            state.products = state.products.filter(item=>item._id !== actions.payload);
            state.isFetching = false;
        },

         // edit
        editProductStart : (state)=>{
            state.isFetching = true;
        },
        editProductFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        editProductSuccess : (state, actions)=> {
            const index = state.products.findIndex(item=>item._id == actions.payload._id);
            state.products[index] = {
                ...state.products[index]
                ,...actions.payload};
            state.isFetching = false;
        },


        // add product 
        addProductStart : (state)=>{
            state.isFetching = true;
        },
        addProductFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        addProductSuccess : (state, actions)=> {
            state.products = [...state.products, actions.payload]
            state.isFetching = false;
        },



        
        


    }
})

const {actions , reducer} = productSlice;
export const {
    getProductSuccess,
    getProductFailure, 
    getProductStart,
    deleteProductFailure, 
    deleteProductStart, 
    deleteProductSuccess,
    editProductFailure, 
    editProductStart, 
    editProductSuccess,
    addProductFailure, 
    addProductStart, 
    addProductSuccess,
} = actions;
export default reducer;


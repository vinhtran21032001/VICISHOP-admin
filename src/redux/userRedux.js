import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
        isFetching : false,
        error : false
    },
    reducers :{
        // Get All product
        getUserStart : (state)=>{
            state.isFetching = true;
        },
        getUserFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        getUserSuccess : (state, actions)=> {
            state.users = actions.payload;
            state.isFetching = false;
        },



        // delete
        deleteUserStart : (state)=>{
            state.isFetching = true;
        },
        deleteUserFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        deleteUserSuccess : (state, actions)=> {
            state.users = state.users.filter(item=>item._id !== actions.payload);
            state.isFetching = false;
        },

         // edit
        editUserStart : (state)=>{
            state.isFetching = true;
        },
        editUserFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        editUserSuccess : (state, actions)=> {
            const index = state.users.findIndex(item=>item._id == actions.payload._id);
            state.users[index] = {
                ...state.users[index]
                ,...actions.payload};
            state.isFetching = false;
        },


        // add product 
        addUserStart : (state)=>{
            state.isFetching = true;
        },
        addUserFailure :(state)=> {
            state.isFetching = false;
            state.error = true;
        },
        addUserSuccess : (state, actions)=> {
            console.log(actions.payload)
            state.users = [...state.users, actions.payload]
            state.isFetching = false;
        },
    }
})

const {actions , reducer} = userSlice;
export const {
    getUserSuccess,
    getUserFailure, 
    getUserStart,
    deleteUserSuccess,
    deleteUserFailure, 
    deleteUserStart,
    editUserFailure, 
    editUserStart, 
    editUserSuccess,
    addUserFailure, 
    addUserStart, 
    addUserSuccess,
} = actions;
export default reducer;


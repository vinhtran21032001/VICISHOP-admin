import axios from 'axios'



const  base_URL = "https://vicishop.herokuapp.com/api";
const TOKEN  = "";

export const adminRequest = axios.create({
    baseURL : base_URL,
    headers: {
        token : "Beare " + TOKEN
    },


})
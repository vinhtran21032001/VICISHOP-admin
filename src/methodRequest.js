import axios from 'axios'



const  base_URL = "https://vicishop.herokuapp.com/api";
const TOKEN  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGI3Y2QxMjA5Y2MzM2EwYjcwYTkwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODE3OTE0MSwiZXhwIjoxNjM4NDM4MzQxfQ.Io0JlwRSI5XauSnslYpU8yXdgbZqykHFYhwMN9DnRv4";

export const adminRequest = axios.create({
    baseURL : base_URL,
    headers: {
        token : "Beare " + TOKEN
    },


})
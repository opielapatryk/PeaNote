import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createAccount:false,
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    message:''
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setCreateAccount: (state,action) => {
            return {...state, createAccount:action.payload}
        },
        setFirstName: (state,action) => {
            return {...state, first_name:action.payload}
        },
        setLastName: (state,action) => {
            return {...state, last_name:action.payload}
        },
        setEmail: (state,action) => {
            return {...state, email:action.payload}
        },
        setPassword: (state,action) => {
            return {...state, password:action.payload}
        },
        setMessage: (state,action) => {
            return {...state, message:action.payload}
        },
    }
})

export const {setCreateAccount,setFirstName,setLastName,setEmail,setPassword,setMessage} = loginSlice.actions
export default loginSlice.reducer
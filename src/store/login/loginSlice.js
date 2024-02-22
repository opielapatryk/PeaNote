import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createAccount:false,
    email:'',
    password:'',
    message:'',
    reduxdescription:'',
    modal:false
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setCreateAccount: (state,action) => {
            return {...state, createAccount:action.payload}
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
        setDescription: (state,action) => {
            return {...state, reduxdescription:action.payload}
        },
        showModal: (state,action) => {
            return {...state, modal:action.action}
        }
    }
})

export const {setCreateAccount,setEmail,setPassword,setMessage,setDescription,showModal} = loginSlice.actions
export default loginSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createAccount:false,
    email:'',
    password:'',
    message:'',
    reduxdescription:'',
    modal:false,
    usernameModal:false
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
            return {...state, modal:action.payload}
        },
        showUsernameModal:(state,action) => {
            return {...state, usernameModal:action.payload}
        },
    }
})

export const {setCreateAccount,setEmail,setPassword,setMessage,setDescription,showModal,showUsernameModal} = loginSlice.actions
export default loginSlice.reducer
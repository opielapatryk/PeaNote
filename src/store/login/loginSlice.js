import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createAccount:false,
    email:'',
    password:'',
    message:'',
    reduxdescription:'',
    modalVisible:false
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
        setModalVisible: (state,action) => {
            return {...state, modalvisible:action.payload}
        },
    }
})

export const {setCreateAccount,setEmail,setPassword,setMessage,setDescription,setModalVisible} = loginSlice.actions
export default loginSlice.reducer
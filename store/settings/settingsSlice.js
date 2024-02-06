import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showInput:false,
    showInputUsername:false,
    username:'',
    myimage:''
}

export const settingsSlice = createSlice({
    name:'settings',
    initialState,
    reducers:{
        setShowInput: (state,action) => {
            return {...state, showInput:action.payload}
        },
        setShowInputUsername: (state,action) => {
            return {...state, showInputUsername:action.payload}
        },
        setUsername: (state,action) => {
            return {...state, username:action.payload}
        },
        setMyimage: (state,action) => {
            return {...state, myimage:action.payload}
        },
        removeMyImage: (state) => {
            return {...state, myimage:''}
        },
    }
})

export const {setShowInput,setShowInputUsername,setUsername,setMyimage,removeMyImage} = settingsSlice.actions
export default settingsSlice.reducer
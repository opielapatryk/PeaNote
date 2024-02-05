import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showInput:false,
    showInputUsername:false,
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
    }
})

export const {setShowInput,setShowInputUsername} = settingsSlice.actions
export default settingsSlice.reducer
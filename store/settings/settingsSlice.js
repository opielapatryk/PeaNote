import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showInput:false,
}

export const settingsSlice = createSlice({
    name:'settings',
    initialState,
    reducers:{
        setShowInput: (state,action) => {
            return {...state, showInput:action.payload}
        }
    }
})

export const {setShowInput} = settingsSlice.actions
export default settingsSlice.reducer
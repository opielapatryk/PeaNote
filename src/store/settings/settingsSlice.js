import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showInput:false,
}

export const settingsSlice = createSlice({
    name:'settings',
    initialState,
    reducers:{
        setShowInput: (state,action) => {
            const showInput = state.showInput
            return {...state, showInput:action.payload}
        }
    }
})

export const {setShowInput} = settingsSlice.actions
export default settingsSlice.reducer
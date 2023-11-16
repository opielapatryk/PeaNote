import {createSlice } from '@reduxjs/toolkit'
const initialState = {
    isNote:true,
    text:'default text',
    isInfo: false
}
export const noteSlice = createSlice({
    name:'note',
    initialState,
    reducers:{
        showInfo: (state)=>{
            state.isInfo = true;
        },
        hideInfo: (state)=>{
            state.isInfo = false;
        },
        removeNote: (state)=>{
            state.isNote = false;
        },
    }
})

export const {showInfo, hideInfo,removeNote} = noteSlice.actions;

export default noteSlice.reducer
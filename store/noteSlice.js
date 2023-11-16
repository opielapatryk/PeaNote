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
            return {...state,isInfo: true,text:'Click againt to delete note'}
        },
        hideInfo: (state)=>{
            return {...state,isInfo: false,text:initialState.text}
        },
        removeNote: (state)=>{
            return {...state,isNote: false}
        },
    }
})

export const {showInfo, hideInfo,removeNote} = noteSlice.actions;

export default noteSlice.reducer
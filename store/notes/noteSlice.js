import {createSlice } from '@reduxjs/toolkit'
const initialState = {
    id: 0,
    text:'',
    isInfo: false
}
export const noteSlice = createSlice({
    name:'note',
    initialState,
    reducers:{
        showInfo: (state)=>{
            return {...state,isInfo: true,text:'Click againt to delete note'}
        },
        setText: (state,action)=>{
            return {...state,text:action.payload}
        },
        hideInfo: (state)=>{
            return {...state,isInfo: false,text:initialState.text}
        },
    }
})

export const {showInfo, hideInfo,setText} = noteSlice.actions;

export default noteSlice.reducer
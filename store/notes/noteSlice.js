import {createSlice } from '@reduxjs/toolkit'
const initialState = {
    id: 0,
    text:'',
    isNote:true,
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
        removeNote: (state)=>{
            return {...state,isNote: false}
        },
        isNoteTrue: (state)=>{
            return {...state,isNote: true}
        }
        
    }
})

export const {showInfo, hideInfo,removeNote,setText, isNoteTrue} = noteSlice.actions;

export default noteSlice.reducer
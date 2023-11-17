import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes:[],
    isInput:false,   
}

export const boardSlice = createSlice({
    name:'board',
    initialState,
    reducers:{
        showInput: (state) =>{
            return {...state, isInput: true};
        },
        hideInput: (state) =>{
            return {...state, isInput: false};
        },
        addNote: (state, action) => {
            return {...state, notes:[...state.notes, action.payload]}
        },
        removeNote: (state, action) => {
            return {...state, notes:state.notes.filter(note => note !== action.payload)}
        }
    }
})

export const {showInput, addNote, removeNote, hideInput} = boardSlice.actions
export default boardSlice.reducer
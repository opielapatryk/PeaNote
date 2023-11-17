import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes:[],
    isInput:true,   
    history:[]
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
            return {...state, notes:[...state.notes, action.payload],history: [...state.notes]}
        },
        removeNote: (state, action) => {
            return {
              ...state,
              notes: state.notes.filter(note => note.id !== action.payload),
              history: [...state.notes]
            };
          },
          changeInfo: (state, action) => {
            const prevText = state.history.find((note) => note.id === action.payload)?.text || "";
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === action.payload) {
                        return {
                            ...note,
                            isInfo: !note.isInfo,
                            text: note.isInfo ? prevText : 'click again to delete note',
                        };
                    }
                    return note;
                }),
                history: [...state.notes]
            };
        }     
    }
})

export const {showInput, addNote, removeNote, hideInput,changeInfo} = boardSlice.actions
export default boardSlice.reducer
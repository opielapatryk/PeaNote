import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    notes:[],
    pendingNotes: [],
}

export const boardSlice = createSlice({
    name:'board',
    initialState,
    reducers:{
        addNote: (state, action) => {
            const existingNote = state.notes.find(note => note.id === action.payload.id);
            if(!existingNote){
                return {...state, notes:[...state.notes, action.payload]}
            }
        },
        addPendingNote: (state, action) => {
            const existingNote = state.pendingNotes.find(note => note.id === action.payload.id);
            if (!existingNote) {
                return {...state, pendingNotes: [...state.pendingNotes, action.payload]}
            }
        },
        removeNote: (state, action) => {
            console.log('note removed');
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            };
        },
        removePendingNote: (state,action) => {
            console.log('pend removed');
            return {
                ...state,
                pendingNotes: state.pendingNotes.filter(note => note.id !== action.payload)
            };
        },
        changeInfo: (state, action) => {
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === action.payload) {
                        return {
                            ...note,
                            isInfo: !note.isInfo,
                        };
                    }
                    return note;
                })
            };
        },
        changePendingInfo: (state, action) => {

            return {
                ...state,
                pendingNotes: state.pendingNotes.map((note) => {
                    if (note.id === action.payload) {
                        return {
                            ...note,
                            isInfo: !note.isInfo,
                        };
                    }
                    return note;
                })
            };
        },
        cleanStoreNotes: () =>{
            return {
                notes:[],
                pendingNotes: [],
            }
        }

    }
})

export const {addNote, removeNote,changeInfo,addPendingNote,removePendingNote,changePendingInfo,cleanStoreNotes} = boardSlice.actions
export default boardSlice.reducer
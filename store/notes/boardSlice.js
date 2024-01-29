import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes:[],
    pendingNotes: [],
    history:[],
    pendingHistory: []
}

export const boardSlice = createSlice({
    name:'board',
    initialState,
    reducers:{
        addNote: (state, action) => {
            const existingNote = state.notes.find(note => note.id === action.payload.id);
            if(!existingNote){
                return {...state, notes:[...state.notes, action.payload],history: [...state.notes]}
            }
        },
        addPendingNote: (state, action) => {
            const existingNote = state.pendingNotes.find(note => note.id === action.payload.id);
            if (!existingNote) {
                return {...state, pendingNotes: [...state.pendingNotes, action.payload], pendingHistory: [...state.pendingNotes]}
            }
        },
        removeNote: (state, action) => {
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload),
                history: [...state.notes]
            };
        },
        removePendingNote: (state,action) => {
            return {
                ...state,
                pendingNotes: state.pendingNotes.filter(note => note.id !== action.payload),
                pendingHistory: [...state.pendingNotes]
            };
        },
        changeInfo: (state, action) => {
            // const prevText = state.history.find((note) => note.id === action.payload)?.text || "";
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === action.payload) {
                        return {
                            ...note,
                            isInfo: !note.isInfo,
                            // text: note.isInfo ? prevText : '',
                        };
                    }
                    return note;
                }),
                history: [...state.notes]
            };
        },
        changePendingInfo: (state, action) => {
            // const prevText = state.pendingHistory.find((note) => note.id === action.payload)?.text || "";
            return {
                ...state,
                pendingNotes: state.pendingNotes.map((note) => {
                    if (note.id === action.payload) {
                        return {
                            ...note,
                            isInfo: !note.isInfo,
                            // text: note.isInfo ? prevText : '',
                        };
                    }
                    return note;
                }),
                pendingHistory: [...state.pendingNotes]
            };
        },

    }
})

export const {addNote, removeNote,changeInfo,addPendingNote,removePendingNote,changePendingInfo} = boardSlice.actions
export default boardSlice.reducer
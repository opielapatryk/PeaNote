import { configureStore } from '@reduxjs/toolkit'
import noteReducer from "./notes/noteSlice";
import boardReducer from './notes/boardSlice'

export default configureStore({
    reducer:{
        note:noteReducer,
        board:boardReducer
    }
})
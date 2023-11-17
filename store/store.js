import { configureStore } from '@reduxjs/toolkit'
import noteReducer from "./noteSlice";
import boardReducer from './boardSlice'

export default configureStore({
    reducer:{
        note:noteReducer,
        board:boardReducer
    }
})
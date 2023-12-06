import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './notes/boardSlice'

export default configureStore({
    reducer:{
        board:boardReducer
    }
})
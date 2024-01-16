import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './notes/boardSlice'
import settingsReducer from './settings/settingsSlice'

export default configureStore({
    reducer:{
        board:boardReducer,
        settings:settingsReducer
    }
})
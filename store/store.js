import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './notes/boardSlice'
import settingsReducer from './settings/settingsSlice'
import loginReducer from './login/loginReducer'

export default configureStore({
    reducer:{
        board:boardReducer,
        settings:settingsReducer,
        login:loginReducer
    }
})
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './notes/boardSlice'
import settingsReducer from './settings/settingsSlice'
import loginReducer from './login/loginSlice'
import friendsReducer from './friends/friendsSlice'

export default configureStore({
    reducer:{
        board:boardReducer,
        settings:settingsReducer,
        login:loginReducer,
        friends:friendsReducer
    }
})
import { createContext } from 'react';

export const AuthContext = createContext();

export const initialState = {
    isLoading:true,
    isSignout:false,
    userToken:null,
    userId:null
  }  

export const authReducer = (prevState,action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          userId:action.userId
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
          userId:action.userId
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
          userId: null
        };
    }
  };
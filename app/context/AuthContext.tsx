import { createContext,useContext,useState,useEffect } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

interface AuthProps{
    authState?:{token:string|null;authenticated:boolean|null}
    onLogin?:(email:string,password:string)=>Promise<any>;
}

const TOKEN = 'my-jwt'
export const API_URL = 'http://127.0.0.1:8000/login/'
const AuthContext = createContext<AuthProps>({});

export const useAuth = ()=>{
    return useContext(AuthContext)
}



export const AuthProvider = ({children}:any) =>{
    const [authState, setAuthState] = useState<{
        token:string|null;
        authenticated:boolean|null;
    }>({
        token:null,
        authenticated:null
    })
    useEffect(()=>{
        const loadToken= async()=>{
            const token = await SecureStore.getItemAsync(TOKEN)
            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token:token,
                    authenticated:true
                })
            }
        }
        loadToken
    },[])
    const login = async(email:string,password:string)=>{
        try{
            const result = await axios.post(`${API_URL}`,{email,password})
            setAuthState({
                token:result.data.token,
                authenticated:true
            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
            await SecureStore.setItemAsync(TOKEN,result.data.token)
            return result
        }catch(e){
            return {error:true,msg: (e as any).response.data.msg}
        }
    }
    const value = {
        onLogin:login,
        authState
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
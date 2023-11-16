import { createContext,useContext,useState,useEffect } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

interface AuthProps{
    authState?:{token:string|null;authenticated:boolean|null}
    onLogin?:(email:string,password:string)=>Promise<any>;
}

const TOKEN = 'my-jwt'
export const API_URL = 'http://127.0.0.1:8000/login'
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
            console.log("Attempting to load token...");
            try {
                const token = await SecureStore.getItemAsync(TOKEN)
                console.log("Token loaded:", token);
                if(token){
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    setAuthState({
                        token:token,
                        authenticated:true
                    })
                }
            } catch (error) {
                console.error("Error loading token:", error);
            }
            
        }
        loadToken()
    },[])
    const login = async(email:string,password:string)=>{
        try{
            const result = await axios.post(`${API_URL}`, { email, password });

            const setCookieHeader = result.headers['set-cookie'];
            const csrfTokenCookie = setCookieHeader.find((cookie) => cookie.startsWith('csrftoken='));
            if (!csrfTokenCookie) {
                throw new Error('CSRF token cookie not found in headers.');
            }

            const csrfToken = csrfTokenCookie.split(';')[0].split('=')[1];

            axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
            console.log("CSRF token set in headers:", csrfToken);

            setAuthState({
                token: result.data.token,
                authenticated: true,
            });

            await SecureStore.setItemAsync(TOKEN, result.data.token);
            console.log("Token saved:", result.data.token);

            return result;
        }catch(e){
            console.error("Login error:", e);
            return {error:true,msg: (e as any).response.data.msg}
        }
    }
    const value = {
        onLogin:login,
        authState
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
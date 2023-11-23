import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const TOKEN = 'my-jwt';

const AuthContext = createContext({});
const AuthContextUpdate = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useAuthUpdate = () => {
    return useContext(AuthContextUpdate);
};

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
    });

    useEffect(() => {
        const loadToken = async () => {
            console.log("Attempting to load token...");
            try {
                const token = await SecureStore.getItemAsync(TOKEN);
                console.log("Token loaded:", token);
                if (token) {
                    axios.defaults.headers.common['Authentication: '] = `Token ${token}`;

                    setAuthState({
                        token: token,
                        authenticated: true,
                    });
                }
            } catch (error) {
                console.error("Error loading token:", error);
            }
        };
        loadToken();
    }, [authState.authenticated]);

    console.log('Auth State:', authState);

    return (
        <AuthContext.Provider value={authState}>

                {children}

        </AuthContext.Provider>
    );
};

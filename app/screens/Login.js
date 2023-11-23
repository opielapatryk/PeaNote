import { View, TextInput, Button, Text } from 'react-native';
import React, { useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export default function Login() {
    const TOKEN = 'token';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/custom_login', {
                username: email,
                password: password
            });

            await SecureStore.setItemAsync(TOKEN, response.data.Authorization);
            console.log('Token stored:', response.data.Authorization);

            setMessage('Redirecting to home page...');

            return response;

        } catch (e) {
            setMessage("Login error: " + e);
        }
    }

    return (
        <View>
            <TextInput placeholder='email' onChangeText={(text) => setEmail(text)} value={email} />
            <TextInput placeholder='password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />
            <Button onPress={login} title='sign in' />
            <Text>{message}</Text>
        </View>
    )
}

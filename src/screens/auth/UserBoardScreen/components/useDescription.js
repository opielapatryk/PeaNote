import React, { useState } from "react";
import { getDescription } from "../functions/getDescription";
import { useFocusEffect } from '@react-navigation/native';

export function useDescription(friendEmail){
    const [description,setDescription] = useState('');

    useFocusEffect(
        React.useCallback(() => {
             getDescription(friendEmail).then((description)=>setDescription(description))
        }, [])
    );

    return description
}
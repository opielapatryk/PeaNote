import React, { useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {isRequest} from '../functions/isRequest';

export const useRequest = (friendEmail) => {
    const [invited,setInvited] = useState(false);

    useFocusEffect(
        React.useCallback(()=>{
            isRequest(friendEmail).then((invited)=>setInvited(invited));
        },[])
    )

    return invited
}
import React, { useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {isPending} from '../functions/isPending';

export const useRequest = (friendEmail) => {
    const [invited,setInvited] = useState(false);

    useFocusEffect(
        React.useCallback(()=>{
            isPending(friendEmail).then((invited)=>setInvited(invited));
        },[])
    )

    return [invited,setInvited]
}
import React from 'react';
import { signOutAndClearReduxStore } from '../functions/signOutAndClearReduxStore';
import { useDispatch, useSelector } from 'react-redux';

const Logout = ({navigation}) => {
    const { notes,pendingNotes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', async (e) => {
          await e.preventDefault();

          await signOutAndClearReduxStore(notes,dispatch,pendingNotes)
          
          console.log('notes after logout: ', notes);
        });
        return unsubscribe;
      }, [navigation]);
}

export default Logout;
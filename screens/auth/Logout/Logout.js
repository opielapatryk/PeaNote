import React from 'react';
import { signOutAndClearReduxStore } from './signOutAndClearReduxStore';
import { useDispatch, useSelector} from 'react-redux';

const Logout = ({navigation}) => {
    const { notes,pendingNotes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          e.preventDefault();
          signOutAndClearReduxStore(notes,dispatch,pendingNotes)
        });
        return unsubscribe;
      }, [navigation]);
}

export default Logout;
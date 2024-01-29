import React from 'react';
import { signOutAndClearReduxStore } from '../functions/signOutAndClearReduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native'
import { styles } from '../../../../assets/styles/styles';
import Logo from '../../../../assets/images/logo.svg'
import LoginBody from '../../../public/Login/components/LoginBody';

const Logout = ({navigation}) => {
    const { notes,pendingNotes } = useSelector((state)=>state.board)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          signOutAndClearReduxStore(notes,dispatch,pendingNotes)
        });
        return unsubscribe;
      }, [navigation]);
    
      return (
        <View style={styles.container}>
          <Logo width={200} height={150}/>
          <LoginBody/>
        </View>
      );
}

export default Logout;
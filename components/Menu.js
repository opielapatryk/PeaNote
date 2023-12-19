import React, {useContext} from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles/styles';
import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector} from 'react-redux';
import { signOutAndClearReduxStore } from '../logic/funcMenu';

export default function menu({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const dispatch_redux = useDispatch()

  return (
    <View style={styles.menu}>
      <Button title='BOARD' />
      <Button title='PENDING' onPress={()=>navigation.navigate('Pending')}/>
      <Button title='FRIENDS' onPress={() => navigation.navigate('Friends')}/>
      <Button title='SETTINGS' onPress={() => navigation.navigate('Settings')}/>
      <Button onPress={()=>signOutAndClearReduxStore(notes,signOut,dispatch_redux,pendingNotes)} title='LOGOUT' />
    </View>
  );
}

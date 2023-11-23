import React, {useContext} from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';
import { AuthContext } from '../context/AuthContext';

export default function menu() {

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.menu}>
      <Button title='BOARD' />
      <Button title='FRIENDS' />
      <Button title='SETTINGS' />
      <Button onPress={()=>signOut()} title='LOGOUT' />
    </View>
  );
}

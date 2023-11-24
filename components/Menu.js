import React, {useContext} from 'react';
import { Button, View } from 'react-native';
import { styles } from '../assets/styles';
import { AuthContext } from '../context/AuthContext';

export default function menu({ navigation }) {

  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.menu}>
      <Button title='BOARD' />
      <Button title='FRIENDS' onPress={() => navigation.navigate('Friends')}/>
      <Button title='SETTINGS' />
      <Button onPress={()=>signOut()} title='LOGOUT' />
    </View>
  );
}

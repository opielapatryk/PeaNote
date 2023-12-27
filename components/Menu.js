import React from 'react';
import { Pressable, View,Text } from 'react-native';
import { styles } from '../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { signOutAndClearReduxStore } from '../logic/funcMenu';

export default function menu({ navigation }) {
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const dispatch_redux = useDispatch()

  return (
    <View style={styles.menu}>
      <Pressable>
        <Text style={styles.button_two_text}>BOARD</Text>
      </Pressable>
      <Pressable onPress={()=>navigation.navigate('Pending')}>
        <Text style={styles.button_two_text}>
          PENDING
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Friends')}>
        <Text style={styles.button_two_text}>
          FRIENDS
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.button_two_text}>
          SETTINGS
        </Text>
      </Pressable>
      <Pressable onPress={()=>signOutAndClearReduxStore(notes,dispatch_redux,pendingNotes)}>
        <Text style={styles.button_two_text}>
          LOGOUT
        </Text>
      </Pressable>
    </View>
  );
}

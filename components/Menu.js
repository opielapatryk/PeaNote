import React from 'react';
import { Pressable, View,Text } from 'react-native';
import { styles } from '../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import { signOutAndClearReduxStore } from '../logic/funcMenu';
import { useNavigationState } from '@react-navigation/native'    



export default function menu({ navigation }) {
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const dispatch = useDispatch()
  const routes = useNavigationState(state => state.routes)
  const currentRoute = routes[routes.length - 1].name

  return (
    <View style={styles.menu}>
      <Pressable onPress={()=>navigation.navigate('Board')}>
        <Text style={currentRoute === 'Board' ? styles.button_text_clicked : styles.button_text}>BOARD</Text>
      </Pressable>
      <Pressable onPress={()=>navigation.navigate('Pending')}>
      <Text style={currentRoute === 'Pending' ? styles.button_text_clicked : styles.button_text}>
          PENDING
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Friends')}>
        <Text style={styles.button_text}>
          FRIENDS
        </Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.button_text}>
          SETTINGS
        </Text>
      </Pressable>
      <Pressable onPress={()=>signOutAndClearReduxStore(notes,dispatch,pendingNotes)}>
        <Text style={styles.button_text}>
          LOGOUT
        </Text>
      </Pressable>
    </View>
  );
}

import React from 'react';
import {Pressable, Text,View} from 'react-native';
import { styles } from '../../../assets/styles/styles'
import { signOutAndClearReduxStore } from '../../../logic/funcMenu';
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
    
      return (
        <View>
          <Text>Logout!</Text>
        </View>
      );
}


export default Logout;

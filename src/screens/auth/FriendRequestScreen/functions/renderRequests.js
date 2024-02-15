import { Text,Dimensions } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { removeFriendRequestFromFirestore } from './removeFriendRequestFromFirestore';
import { approveFriend } from './approveFriend'
import { styles } from '../../../../../assets/styles/styles'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, { Easing } from 'react-native-reanimated';
import { downloadImage } from '../../BoardScreen/functions/downloadImage';
import { setFriendimage } from "../../../../store/settings/settingsSlice";
import {
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
  } from 'react-native-gesture-handler';

export const renderRequests = ({item},dispatch,navigation) =>{
    

    const rightActions = () => {
        return (
            <Animated.View style={{backgroundColor:'red',justifyContent:'center',width:Dimensions.get('window').width,alignItems:'flex-end'}}>
                <FontAwesome5 name="trash-alt" size={24} color="black"  />
            </Animated.View>
        );
      };

      const leftActions = (progress, dragX) => {
        return (
            <Animated.View style={{backgroundColor:'green',justifyContent:'center',width:Dimensions.get('window').width}}>
                <Animated.Text>Accept</Animated.Text>
            </Animated.View>
        );
      };

    return (
        <Swipeable renderRightActions={rightActions} renderLeftActions={leftActions} onSwipeableOpen={ 
            (direction)=>{
            if(direction==='left'){
                approveFriend(item.email,item.username,dispatch)
            }else{
                removeFriendRequestFromFirestore(item.email,item.username,dispatch)
            }
        }}>
            <TouchableWithoutFeedback style={styles.friendsRequestList} onPress={async()=>{
                    const fileUri = await downloadImage(item.email)
                    dispatch(setFriendimage(fileUri));
                    navigation.navigate('RequestUserScreen', {name:item.username, friendEmail: item.email, oldnickname:''})
            }}>
                <Text>{item.username}</Text>
            </TouchableWithoutFeedback>
        </Swipeable>
    )
}
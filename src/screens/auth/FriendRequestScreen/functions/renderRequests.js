import { View, Pressable, Text,Dimensions,Animated } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { removeFriendRequestFromFirestore } from './removeFriendRequestFromFirestore';
import { styles } from '../../../../../assets/styles/styles'
import { approveFriend } from './approveFriend'
import Swipeable from 'react-native-gesture-handler/Swipeable';

export const renderRequests = ({item},dispatch,navigation) =>{
    const rightActions = () => {
        return (
            <View style={{backgroundColor:'red'}}>
                <FontAwesome5 name="trash-alt" size={24} color="black"  />
            </View>
        );
      };

      const leftActions = () => {
        return (
            <View style={{backgroundColor:'green'}}>
                <Text>Accept</Text>
            </View>
        );
      };

    return (
        <Swipeable renderRightActions={rightActions} renderLeftActions={leftActions} onSwipeableOpen={(direction)=>{
            if(direction==='left'){
                approveFriend(item.email,item.username,dispatch)
            }else{
                removeFriendRequestFromFirestore(item.email,item.username,dispatch)
            }
        }}>
            <View style={styles.friendsRequestList}>
                <Text>{item.username}</Text>
            </View>
        </Swipeable>
    )
}
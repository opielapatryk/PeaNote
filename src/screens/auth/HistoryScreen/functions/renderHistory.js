import { Text,Animated,Dimensions } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { styles } from '../../../../../assets/styles/styles'

export const renderHistory = ({item},dispatch,navigation,translation) =>{
    const rightActions = () => {
        return (
            <Animated.View style={[styles.rightAction,{transform: [{ translateX: translation }],}]}>
                <FontAwesome5 name="trash-alt" size={16} color="white"/>
            </Animated.View>
        );
      };

      const leftActions = () => {
        return (
            <Animated.View style={[styles.leftActions,{transform: [{ translateX: translation }],}]}>
                <Animated.Text style={{color:'white',fontSize:16}}>Accept</Animated.Text>
            </Animated.View>
        );
      };

    return (
        <Swipeable renderRightActions={rightActions} renderLeftActions={leftActions} onSwipeableOpen={ 
            (direction)=>{
            if(direction==='left'){
                Animated.timing(translation, {
                    toValue: Dimensions.get('window').width,
                    useNativeDriver: true,
                  }).start();
                approveFriend(item.email,item.username,dispatch)
            }else{
                Animated.timing(translation, {
                    toValue: -Dimensions.get('window').width,
                    useNativeDriver: true,
                  }).start();
                removeFriendRequestFromFirestore(item.email,dispatch)
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
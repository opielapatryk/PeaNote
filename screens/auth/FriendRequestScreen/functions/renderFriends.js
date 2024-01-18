import { Animated, View, Pressable, Text } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { removeFriendRequestFromFirestore } from './removeFriendRequestFromFirestore';
import { styles } from '../../../../assets/styles/styles'
import { approveFriend } from './approveFriend'

export const renderFriends = ({item,index},friends) =>{
    const animatedValues = friends.map(() => new Animated.Value(200));

    return (
        <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
            <View style={styles.requestItem}>
                <Pressable onPress={()=>approveFriend(item,index,animatedValues)}>
                    <Text>{String(item)}</Text>
                </Pressable>
                <Pressable onPress={()=>removeFriendRequestFromFirestore(item,index,animatedValues)}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                </Pressable>
            </View>
        </Animated.View>
    )
}
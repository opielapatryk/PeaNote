import { View, Pressable, Text } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { removeFriendRequestFromFirestore } from './removeFriendRequestFromFirestore';
import { styles } from '../../../../assets/styles/styles'
import { approveFriend } from './approveFriend'

export const renderFriends = ({item}) =>{
    return (
        <View style={styles.friendsRequestList}>
            <Pressable onPress={()=>approveFriend(item)}>
                <Text>{String(item)}</Text>
            </Pressable>
            <Pressable onPress={()=>removeFriendRequestFromFirestore(item)}>
                <FontAwesome5 name="trash-alt" size={24} color="black" />
            </Pressable>
        </View>
    )
}
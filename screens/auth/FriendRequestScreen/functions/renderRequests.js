import { View, Pressable, Text,Dimensions } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { removeFriendRequestFromFirestore } from './removeFriendRequestFromFirestore';
import { styles } from '../../../../assets/styles/styles'
import { approveFriend } from './approveFriend'

export const renderRequests = ({item},dispatch,navigation) =>{
    return (
        <View style={styles.friendsRequestList}>
            <Pressable onPress={()=>approveFriend(item,dispatch,navigation)} style={{justifyContent:'center',height: Dimensions.get("window").height / 18.4}}>
                <Text>{String(item)}</Text>
            </Pressable>
            <Pressable onPress={()=>removeFriendRequestFromFirestore(item,dispatch,navigation)}  style={{justifyContent:'center',height: Dimensions.get("window").height / 18.4}}>
                <FontAwesome5 name="trash-alt" size={24} color="black"  />
            </Pressable>
        </View>
    )
}
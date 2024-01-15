import React from 'react';
import {View, Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import { goToCreateAccount,goToLogIn } from '../../../constants';

const CreateAccountFooter = ({setCreateAccount,setMessage,setLastName,setEmail,setPassword,setFirstName}) => {
    return (
<>
        <View style={styles.bottomView}>
          <Pressable style={styles.pressableInBottonViewLeftCreateAccountOn} onPress={()=>setCreateAccount(true)}>
            <Text>
              Create Account
            </Text>
          </Pressable>  

          <Pressable style={styles.pressableInBottonViewRightCreateAccountOn} onPress={()=>setCreateAccount(false)}>
            <Text>
              Log In
            </Text>
          </Pressable>  

        </View>
      </>
    );
}

export default CreateAccountFooter;
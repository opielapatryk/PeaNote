import React from 'react';
import {View, Pressable,Text} from 'react-native';
import { styles } from '../../../../assets/styles/styles';
import { useDispatch } from 'react-redux';
import { setFirstName,setLastName,setEmail,setPassword,setCreateAccount,setMessage } from '../../../../store/login/loginReducer';

const CreateAccountFooter = () => {
  const dispatch = useDispatch()
    return (
<>
        <View style={styles.bottomView}>
          <Pressable style={styles.pressableInBottonViewLeftCreateAccountOn} onPress={()=>{
            dispatch(setCreateAccount(true))
            dispatch(setFirstName(''))
            dispatch(setLastName(''))
            dispatch(setEmail(''))
            dispatch(setPassword(''))
            dispatch(setMessage(''))
            }}>
            <Text>
              Create Account
            </Text>
          </Pressable>  

          <Pressable style={styles.pressableInBottonViewRightCreateAccountOn} onPress={()=>{
            dispatch(setCreateAccount(false))
            dispatch(setFirstName(''))
            dispatch(setLastName(''))
            dispatch(setEmail(''))
            dispatch(setPassword(''))
            dispatch(setMessage(''))
            }}>
            <Text>
              Log In
            </Text>
          </Pressable>  

        </View>
      </>
    );
}

export default CreateAccountFooter;
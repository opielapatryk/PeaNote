import {View,Text,Switch, TextInput,Pressable} from 'react-native'
import { styles } from '../../../../assets/styles/styles';
import { changePassword } from '../functions/changePassword';
import {deleteAccount} from '../functions/deleteAccount'
import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {askBeforeStick} from '../functions/askBeforeStick'
import { checkIsAskBeforeStickingNoteFlagOff } from '../functions/checkIsAskBeforeStickingNoteFlagOff';
import { HANDLE_PASSWORD_CHANGE_BUTTON_PRESS } from "../../../constants";

const SettingsScreen = () => {
  const [message, setMessage] = useState('');
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState(false);
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const {showInput } = useSelector((state)=> state.settings)
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [deleteAccountPressed, setDeleteAccountPressed] = useState(false);


  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff({setAskBeforeStickingNoteFlag});
  }, []);

  return (
    <View style={styles.board}>

      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={() => askBeforeStick({setAskBeforeStickingNoteFlag,setMessage})}
          value={askBeforeStickingNoteFlag}
        />
      </View>

      {showInput && <TextInput style={styles.settingsTextInput} placeholder="New Password" onChangeText={setNewPassword} secureTextEntry />}

      <Pressable style={styles.settingButton} onPress={showInput ? ()=>changePassword({setDeleteAccountPressed,newPassword,setMessage,dispatch}) : ()=>HANDLE_PASSWORD_CHANGE_BUTTON_PRESS({setDeleteAccountPressed,dispatch,setMessage})}><Text style={styles.settingsText}>{showInput ? 'SET NEW PASSWORD' : 'CHANGE PASSWORD'}</Text></Pressable>

      {deleteAccountPressed ? (
        <Pressable style={styles.settingButton} onPress={()=>deleteAccount({notes,dispatch,pendingNotes})}><Text style={styles.settingsText}>CONFIRM ACCOUNT DELETE</Text></Pressable>
      ) : (
        <Pressable style={styles.settingButton} onPress={() => setDeleteAccountPressed(true)}><Text style={styles.settingsText}>DELETE ACCOUNT</Text></Pressable>
      )}

      <Text style={styles.settingsMessage}>{message}</Text>
    </View>
  )
};

export default SettingsScreen;

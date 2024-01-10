import React, {useEffect, useState } from 'react';
import { Text, View, TextInput, Switch,Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {checkIsAskBeforeStickingNoteFlagOff,deleteAccount,changePassword,askBeforeStick} from '../logic/apiSettingsScreen'
import { styles } from '../../../assets/styles/styles';

const SettingsScreen = () => {
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const dispatchRedux = useDispatch();
  const [message, setMessage] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmAccountDelete, setConfirmAccountDelete] = useState(false);
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState(false);

  const toggleSwitch = () => askBeforeStick(setAskBeforeStickingNoteFlag,setMessage)

  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff(setAskBeforeStickingNoteFlag);
  }, []);


  const renderChangePasswordButtons = () => (
    <>
      <Pressable style={styles.settingButton} onPress={handlePasswordChangeButtonPress}><Text style={styles.settingsText}>CHANGE PASSWORD</Text></Pressable>
      <Pressable style={styles.settingButton} onPress={()=>deleteAccount(notes,dispatchRedux,pendingNotes)}><Text style={styles.settingsText}>CONFIRM ACCOUNT DELETE</Text></Pressable>
    </>
  );

  const renderDeleteAccountButtons = () => (
    <>
      <Pressable style={styles.settingButton} onPress={handlePasswordChangeButtonPress}><Text style={styles.settingsText}>CHANGE PASSWORD</Text></Pressable>
      <Pressable style={styles.settingButton} onPress={() => setConfirmAccountDelete(true)}><Text style={styles.settingsText}>DELETE ACCOUNT</Text></Pressable>
    </>
  );

  const handlePasswordChangeButtonPress = () => {
    setConfirmAccountDelete(false);
    setShowInput(false);
    setMessage('');
  };

  const renderDeleteAccountBeforeClickingChangePassword = () => (
    <View style={styles.board}>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={askBeforeStickingNoteFlag}
          thumbColor={'white'}
        />
      </View>

      {confirmAccountDelete ? renderChangePasswordButtons() : renderDeleteAccountButtons()}

      <Text>{message}</Text>
    </View>
  );

  const renderDeleteAccountAfterClickingChangePassword = () => (
    <View style={styles.board}>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={askBeforeStickingNoteFlag}
        />
      </View>


      <TextInput style={styles.settingsTextInput} placeholder="Old Password" onChangeText={setOldPassword} secureTextEntry />
      <TextInput style={styles.settingsTextInput} placeholder="New Password" onChangeText={setNewPassword} secureTextEntry />
      <Pressable style={styles.settingButton} onPress={()=>changePassword(setConfirmAccountDelete,newPassword,setMessage)}><Text style={styles.settingsText}>CONFIRM NEW PASSWORD</Text></Pressable>

      {confirmAccountDelete ? (
        <Pressable style={styles.settingButton} onPress={()=>deleteAccount(notes,dispatchRedux,pendingNotes)}><Text style={styles.settingsText}>CONFIRM ACCOUNT DELETE</Text></Pressable>
      ) : (
        <Pressable style={styles.settingButton} onPress={() => setConfirmAccountDelete(true)}><Text style={styles.settingsText}>DELETE ACCOUNT</Text></Pressable>
      )}

      <Text style={styles.settingsMessage}>{message}</Text>
    </View>
  );

  

  return showInput ? (
    renderDeleteAccountBeforeClickingChangePassword()
  ) : (
    renderDeleteAccountAfterClickingChangePassword()
  );
};

export default SettingsScreen;

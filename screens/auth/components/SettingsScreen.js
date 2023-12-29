import React, {useEffect, useState } from 'react';
import { Text, View, Button, TextInput, Switch} from 'react-native';
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
      <Button title="CHANGE PASSWORD" onPress={handlePasswordChangeButtonPress} />
      <Button title="CONFIRM ACCOUNT DELETE" onPress={()=>deleteAccount(notes,dispatchRedux,pendingNotes)} />
    </>
  );

  const renderDeleteAccountButtons = () => (
    <>
      <Button title="CHANGE PASSWORD" onPress={handlePasswordChangeButtonPress} />
      <Button title="DELETE ACCOUNT" onPress={() => setConfirmAccountDelete(true)} />
    </>
  );

  const handlePasswordChangeButtonPress = () => {
    setConfirmAccountDelete(false);
    setShowInput(false);
    setMessage('');
  };

  const renderDeleteAccountBeforeClickingChangePassword = () => (
    <View>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={askBeforeStickingNoteFlag}
        />
      </View>

      {confirmAccountDelete ? renderChangePasswordButtons() : renderDeleteAccountButtons()}

      <Text>{message}</Text>
    </View>
  );

  const renderDeleteAccountAfterClickingChangePassword = () => (
    <View>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={askBeforeStickingNoteFlag}
        />
      </View>


      <TextInput placeholder="Old Password" onChangeText={setOldPassword} secureTextEntry />
      <TextInput placeholder="New Password" onChangeText={setNewPassword} secureTextEntry />
      <Button title="CONFIRM NEW PASSWORD" onPress={()=>changePassword(setConfirmAccountDelete,newPassword,setMessage)} />

      {confirmAccountDelete ? (
        <Button title="CONFIRM ACCOUNT DELETE" onPress={()=>deleteAccount(notes,dispatchRedux,pendingNotes)} />
      ) : (
        <Button title="DELETE ACCOUNT" onPress={() => setConfirmAccountDelete(true)} />
      )}

      <Text>{message}</Text>
    </View>
  );

  

  return showInput ? (
    renderDeleteAccountBeforeClickingChangePassword()
  ) : (
    renderDeleteAccountAfterClickingChangePassword()
  );
};

export default SettingsScreen;

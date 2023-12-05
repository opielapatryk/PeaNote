import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, TextInput, Modal } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../assets/styles';
import { useFocusEffect } from '@react-navigation/native';
import {checkIsAskBeforeStickingNoteFlagOff,deleteAccount,changePassword,askBeforeStick,removeNotesFromReduxStore} from './logic/apiSettingsScreen'

const SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const { notes } = useSelector((state) => state.board);
  const dispatchRedux = useDispatch();
  const [message, setMessage] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmAccountDelete, setConfirmAccountDelete] = useState(false);
  const [modalVisible, setModalVisibility] = useState(false);
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState('OFF');

  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff(setAskBeforeStickingNoteFlag);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        removeNotesFromReduxStore(notes,dispatchRedux);
      };
    }, [notes])
  );

  const renderChangePasswordButtons = () => (
    <>
      <Button title="CHANGE PASSWORD" onPress={handlePasswordChangeButtonPress} />
      <Button title="CONFIRM ACCOUNT DELETE" onPress={()=>deleteAccount(signOut,notes,dispatchRedux)} />
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
      <Button title={`ASK BEFORE STICKING NOTE | ${askBeforeStickingNoteFlag}`} onPress={toggleModal} />

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
        <View style={styles.modal}>
          <Button onPress={(()=>askBeforeStick(setModalVisibility,setAskBeforeStickingNoteFlag,setMessage))} title="Confirm" />
          <Button onPress={toggleModal} title="Hide" />
        </View>
      </Modal>

      {confirmAccountDelete ? renderChangePasswordButtons() : renderDeleteAccountButtons()}

      <Text>{message}</Text>
    </View>
  );

  const renderDeleteAccountAfterClickingChangePassword = () => (
    <View>
      <Button title={`ASK BEFORE STICKING NOTE | ${askBeforeStickingNoteFlag}`} onPress={toggleModal} />

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={toggleModal}>
        <View style={styles.modal}>
          <Button onPress={()=>askBeforeStick(setModalVisibility,setAskBeforeStickingNoteFlag,setMessage)} title="Confirm" />
          <Button onPress={toggleModal} title="Hide" />
        </View>
      </Modal>

      <TextInput placeholder="Old Password" onChangeText={setOldPassword} secureTextEntry />
      <TextInput placeholder="New Password" onChangeText={setNewPassword} secureTextEntry />
      <Button title="CONFIRM NEW PASSWORD" onPress={()=>changePassword(setConfirmAccountDelete,oldPassword,newPassword,setMessage,setShowInput)} />

      {confirmAccountDelete ? (
        <Button title="CONFIRM ACCOUNT DELETE" onPress={()=>deleteAccount(signOut,notes,dispatchRedux)} />
      ) : (
        <Button title="DELETE ACCOUNT" onPress={() => setConfirmAccountDelete(true)} />
      )}

      <Text>{message}</Text>
    </View>
  );

  const toggleModal = () => setModalVisibility(!modalVisible);

  return showInput ? (
    renderDeleteAccountBeforeClickingChangePassword()
  ) : (
    renderDeleteAccountAfterClickingChangePassword()
  );
};

export default SettingsScreen;

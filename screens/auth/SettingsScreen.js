import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, TextInput, Modal } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { removeNote } from '../../store/boardSlice';
import { styles } from '../../assets/styles';
import { useFocusEffect } from '@react-navigation/native';
import { userLink } from '../../components/Constants';

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
    checkIsAskBeforeStickingNoteFlagOff();
  }, []);

  const checkIsAskBeforeStickingNoteFlagOff = async () => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.get(userLink(userID));
      const data = resp.data.askBeforeStick;
      setAskBeforeStickingNoteFlag(data ? 'ON' : 'OFF');
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAccount = async () => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.delete(userLink(userID));

      if (resp.status === 204) {
        signOut();
        notes.forEach((sticker) => dispatchRedux(removeNote(sticker.id)));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const changePassword = async () => {
    setConfirmAccountDelete(false);
    try {
      const token = await SecureStore.getItemAsync('userToken');
      const resp = await axios.put(
        'http://localhost:8000/update_password',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      if (resp.status && resp.status === 204) {
        setMessage('Password updated!');
      }
      setShowInput(true);
    } catch (error) {
      if (error) {
        setMessage('Something went wrong! Try providing a different password!');
      }
      console.log(error.message);
    }
  };

  const askBeforeStick = async () => {
    try {
      let userID = await SecureStore.getItemAsync('userId');
      const resp = await axios.get(userLink(userID));
      const data = resp.data.askBeforeStick;
      const patchRequest = await axios.patch(userLink(userID), {
        askBeforeStick: !data,
      });

      if (patchRequest.status && patchRequest.status === 200) {
        setModalVisibility(false);
        setAskBeforeStickingNoteFlag(data ? 'OFF' : 'ON');
      }
    } catch (error) {
      setModalVisibility(false);
      setMessage('Something went wrong! Try again later..');
      console.log(error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        const removeNotesFromReduxStore = async () => {
          await Promise.all(notes.map((sticker) => dispatchRedux(removeNote(sticker.id))));
        };
        removeNotesFromReduxStore();
      };
    }, [notes])
  );

  const renderChangePasswordButtons = () => (
    <>
      <Button title="CHANGE PASSWORD" onPress={handlePasswordChangeButtonPress} />
      <Button title="CONFIRM ACCOUNT DELETE" onPress={deleteAccount} />
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
          <Button onPress={askBeforeStick} title="Confirm" />
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
          <Button onPress={askBeforeStick} title="Confirm" />
          <Button onPress={toggleModal} title="Hide" />
        </View>
      </Modal>

      <TextInput placeholder="Old Password" onChangeText={setOldPassword} secureTextEntry />
      <TextInput placeholder="New Password" onChangeText={setNewPassword} secureTextEntry />
      <Button title="CONFIRM NEW PASSWORD" onPress={changePassword} />

      {confirmAccountDelete ? (
        <Button title="CONFIRM ACCOUNT DELETE" onPress={deleteAccount} />
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

import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TextInput, Pressable,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../assets/styles/styles';
import {checkIsAskBeforeStickingNoteFlagOff} from '../functions/checkIsAskBeforeStickingNoteFlagOff';
import {askBeforeStick} from '../functions/askBeforeStick';
import {deleteAccount} from '../functions/deleteAccount';
import {changePassword} from '../functions/changePassword';
import { HANDLE_PASSWORD_CHANGE_BUTTON_PRESS } from '../../../constants';
import { setShowInput} from '../../../../store/settings/settingsSlice';
import { setMessage } from '../../../../store/login/loginSlice';
import { useFocusEffect } from '@react-navigation/native';
import { signOutAndClearReduxStore } from '../../Logout/functions/signOutAndClearReduxStore';

const SettingsScreen = () => {
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [deleteAccountPressed, setDeleteAccountPressed] = useState(false);

  const { notes, pendingNotes } = useSelector((state) => state.board);
  const { showInput } = useSelector((state) => state.settings);
  const { message } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      return ()=>{
        setDeleteAccountPressed(false)
        dispatch(setShowInput(false))
        dispatch(setMessage(''))
      }
    }, [])
  );

  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff({ setAskBeforeStickingNoteFlag });
  }, []);

  const handlePasswordChange = () => {
    if (showInput) {
      changePassword({ setDeleteAccountPressed, newPassword, dispatch });
    } else {
      HANDLE_PASSWORD_CHANGE_BUTTON_PRESS({ setDeleteAccountPressed, dispatch });
    }
  };

  const handleDeleteAccount = () => {
    if (deleteAccountPressed) {
      deleteAccount({ notes, dispatch, pendingNotes })
    } else {
      setDeleteAccountPressed(true);
    }
  };

  return (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}>
    <View style={styles.friendsboard}>
      <View>
        <View style={styles.switchRow}>
          <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
          <Switch
            onValueChange={() => askBeforeStick({ setAskBeforeStickingNoteFlag })}
            value={askBeforeStickingNoteFlag}
          />
        </View>

        {showInput && (
          <TextInput
            style={styles.friendsTextInput}
            placeholder={message?message:"NEW PASSWORD"}
            onChangeText={setNewPassword}
            secureTextEntry
          />
        )}

        <Pressable style={styles.friendsHeaderRequest} onPress={handlePasswordChange}>
          <Text style={styles.friendsHeaderRequestText}>{showInput ? 'SET NEW PASSWORD' : 'CHANGE PASSWORD'}</Text>
        </Pressable>

        <Pressable style={styles.friendsHeaderRequest} onPress={()=>signOutAndClearReduxStore(dispatch)}>
          <Text style={styles.friendsHeaderRequestText}>LOGOUT</Text>
        </Pressable>
      </View>

      <Pressable style={styles.deleteAccountButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteAccountText}>
          {deleteAccountPressed ? 'CONFIRM ACCOUNT DELETE' : 'DELETE ACCOUNT'}
        </Text>
      </Pressable>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SettingsScreen;

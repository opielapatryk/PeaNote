import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TextInput, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../../assets/styles/styles';
import {checkIsAskBeforeStickingNoteFlagOff} from '../functions/checkIsAskBeforeStickingNoteFlagOff';
import {askBeforeStick} from '../functions/askBeforeStick';
import {deleteAccount} from '../functions/deleteAccount';
import {changePassword} from '../functions/changePassword';
import { HANDLE_PASSWORD_CHANGE_BUTTON_PRESS } from '../../../constants';

const SettingsScreen = () => {
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [deleteAccountPressed, setDeleteAccountPressed] = useState(false);

  const { notes, pendingNotes } = useSelector((state) => state.board);
  const { showInput } = useSelector((state) => state.settings);
  const { message } = useSelector((state) => state.login);

  const dispatch = useDispatch();

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
      deleteAccount({ notes, dispatch, pendingNotes });
    } else {
      setDeleteAccountPressed(true);
    }
  };

  return (
    <View style={styles.board}>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={() => askBeforeStick({ setAskBeforeStickingNoteFlag })}
          value={askBeforeStickingNoteFlag}
        />
      </View>

      {showInput && (
        <TextInput
          style={styles.settingsTextInput}
          placeholder="New Password"
          onChangeText={setNewPassword}
          secureTextEntry
        />
      )}

      <Pressable style={styles.settingButton} onPress={handlePasswordChange}>
        <Text style={styles.settingsText}>{showInput ? 'SET NEW PASSWORD' : 'CHANGE PASSWORD'}</Text>
      </Pressable>

      <Pressable style={styles.settingButton} onPress={handleDeleteAccount}>
        <Text style={styles.settingsText}>
          {deleteAccountPressed ? 'CONFIRM ACCOUNT DELETE' : 'DELETE ACCOUNT'}
        </Text>
      </Pressable>

      <Text style={styles.settingsMessage}>{message}</Text>
    </View>
  );
};

export default SettingsScreen;

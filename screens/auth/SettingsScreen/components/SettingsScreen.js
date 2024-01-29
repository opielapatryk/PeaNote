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
            placeholder="NEW PASSWORD"
            onChangeText={setNewPassword}
            secureTextEntry
          />
        )}

        <Pressable style={styles.friendsHeaderRequest} onPress={handlePasswordChange}>
          <Text style={styles.friendsHeaderRequestText}>{showInput ? 'SET NEW PASSWORD' : 'CHANGE PASSWORD'}</Text>
        </Pressable>
        <Text style={styles.settingsMessage}>{message}</Text>
      </View>

      <Pressable style={styles.friendsHeaderRequest} onPress={handleDeleteAccount}>
        <Text style={styles.friendsHeaderRequestText}>
          {deleteAccountPressed ? 'CONFIRM ACCOUNT DELETE' : 'DELETE ACCOUNT'}
        </Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

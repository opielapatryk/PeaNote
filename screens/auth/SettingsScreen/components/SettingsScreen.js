import React, {useEffect, useState } from 'react';
import { Text, View, TextInput, Switch,Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {deleteAccount,changePassword,askBeforeStick} from '../functions/changePassword'
import { styles } from '../../../../assets/styles/styles';
import { checkIsAskBeforeStickingNoteFlagOff } from '../functions/checkIsAskBeforeStickingNoteFlagOff';
import {renderDeleteAccountBeforeClickingChangePassword} from './renderDeleteAccountBeforeClickingChangePassword'
import {renderDeleteAccountAfterClickingChangePassword} from './renderDeleteAccountAfterClickingChangePassword'

const SettingsScreen = () => {
  const { notes,pendingNotes } = useSelector((state)=>state.board)
  const dispatchRedux = useDispatch();
  const [message, setMessage] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmAccountDelete, setConfirmAccountDelete] = useState(false);
  const [askBeforeStickingNoteFlag, setAskBeforeStickingNoteFlag] = useState(false);

  useEffect(() => {
    checkIsAskBeforeStickingNoteFlagOff(setAskBeforeStickingNoteFlag);
  }, []);

  return showInput ? (
    renderDeleteAccountBeforeClickingChangePassword(confirmAccountDelete,askBeforeStickingNoteFlag,message)
  ) : (
    renderDeleteAccountAfterClickingChangePassword(setConfirmAccountDelete,newPassword,setMessage,setNewPassword,confirmAccountDelete,notes,dispatchRedux,pendingNotes,message)
  );
};

export default SettingsScreen;

import {View,Text,Switch, TextInput,Pressable} from 'react-native'
import { styles } from '../../../../assets/styles/styles';
import { changePassword } from '../functions/changePassword';
import {deleteAccount} from '../functions/deleteAccount'

export const renderDeleteAccountAfterClickingChangePassword = (setConfirmAccountDelete,newPassword,setMessage,setNewPassword,confirmAccountDelete,notes,dispatchRedux,pendingNotes,message) => (
    <View style={styles.board}>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={askBeforeStickingNoteFlag}
        />
      </View>
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
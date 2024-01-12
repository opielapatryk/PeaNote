import { Pressable,Text } from "react-native";
import { styles } from "../../../../assets/styles/styles";
import { deleteAccount } from "../functions/deleteAccount";

export const renderChangePasswordButtons = (handlePasswordChangeButtonPress,notes,dispatchRedux,pendingNotes) => (
    <>
      <Pressable style={styles.settingButton} onPress={handlePasswordChangeButtonPress}><Text style={styles.settingsText}>CHANGE PASSWORD</Text></Pressable>
      <Pressable style={styles.settingButton} onPress={()=>deleteAccount(notes,dispatchRedux,pendingNotes)}><Text style={styles.settingsText}>CONFIRM ACCOUNT DELETE</Text></Pressable>
    </>
  );
import { Pressable,Text } from "react-native";
import { handlePasswordChangeButtonPress } from "../functions/constants";
import { styles } from "../../../../assets/styles/styles";

export const renderDeleteAccountButtons = () => (
    <>
      <Pressable style={styles.settingButton} onPress={handlePasswordChangeButtonPress}><Text style={styles.settingsText}>CHANGE PASSWORD</Text></Pressable>
      <Pressable style={styles.settingButton} onPress={() => setConfirmAccountDelete(true)}><Text style={styles.settingsText}>DELETE ACCOUNT</Text></Pressable>
    </>
  );
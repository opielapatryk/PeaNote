import { Pressable,Text } from "react-native";
import { HANDLE_PASSWORD_CHANGE_BUTTON_PRESS } from "../../../constants";
import { styles } from "../../../../assets/styles/styles";

export const renderDeleteAccountButtons = () => (
    <>
      <Pressable style={styles.settingButton} onPress={HANDLE_PASSWORD_CHANGE_BUTTON_PRESS}><Text style={styles.settingsText}>CHANGE PASSWORD</Text></Pressable>
      <Pressable style={styles.settingButton} onPress={() => setConfirmAccountDelete(true)}><Text style={styles.settingsText}>DELETE ACCOUNT</Text></Pressable>
    </>
  );
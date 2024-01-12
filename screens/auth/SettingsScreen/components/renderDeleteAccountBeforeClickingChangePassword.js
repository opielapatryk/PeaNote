import {View, Text, Switch} from 'react-native'
import { styles } from '../../../../assets/styles/styles';
import {renderChangePasswordButtons} from './renderChangePasswordButtons'
import {renderDeleteAccountButtons} from './renderDeleteAccountButtons'
import {TOGGLE_SWITCH} from '../../../constants'

export const renderDeleteAccountBeforeClickingChangePassword = (confirmAccountDelete,askBeforeStickingNoteFlag,message) => (
    <View style={styles.board}>
      <View style={styles.switchRow}>
        <Text style={styles.settingsActionText}>ASK BEFORE STICKING NOTE</Text>
        <Switch
          onValueChange={TOGGLE_SWITCH}
          value={askBeforeStickingNoteFlag}
          thumbColor={'white'}
        />
      </View>

      {confirmAccountDelete ? renderChangePasswordButtons(handlePasswordChangeButtonPress,notes,dispatchRedux,pendingNotes) : renderDeleteAccountButtons()}

      <Text>{message}</Text>
    </View>
  );
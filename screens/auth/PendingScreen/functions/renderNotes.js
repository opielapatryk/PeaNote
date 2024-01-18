import { sendNoteToBoard } from './sendNoteToBoard';
import { Pressable, Text, Animated } from 'react-native';
import { PendingNote } from '../components/PendingNote';
import { styles } from '../../../../assets/styles/styles';

export const renderNotes = ({ item, index }, pendingNotes,dispatch) => {
    const animatedValues = pendingNotes.map(() => new Animated.Value(200));

    return (
      <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
        <PendingNote id={item.id} isInfo={item.isInfo} />
        <Pressable style={{alignItems: 'center'}}
          onPress={() => {
            sendNoteToBoard(item.id, dispatch,index,animatedValues);
          }}
        ><Text style={styles.approveNote}>Approve note</Text></Pressable>
      </Animated.View>
    );
  };
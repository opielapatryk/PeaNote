import React from 'react';
import { Pressable, Button, FlatList, Animated } from 'react-native';
import { PendingNote } from '../../../components/PendingNote';
import { styles } from '../../../assets/styles/styles';
import { useDispatch, useSelector } from 'react-redux';
import { sendNoteToBoard, onClickChangeInfo } from '../logic/apiPendingScreen';

const PendingScreen = () => {
  const { pendingNotes } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const animatedValues = pendingNotes.map(() => new Animated.Value(200));

  const renderNotes = ({ item, index }) => {
    return (
      <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
        <PendingNote id={item.id} text={item.text} isInfo={item.isInfo} />
        <Button
          title="Approve note"
          onPress={() => {
            sendNoteToBoard(item.id, item.text, dispatch,index,animatedValues);
          }}
        />
      </Animated.View>
    );
  };

  return (
      <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
        <FlatList data={pendingNotes} renderItem={renderNotes} keyExtractor={(note) => note.id} />
      </Pressable>
  );
};

export default PendingScreen;

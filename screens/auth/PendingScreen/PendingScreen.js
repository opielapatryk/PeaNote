import React from 'react';
import { Pressable, Text, FlatList, Animated,View } from 'react-native';
import { PendingNote } from '../../../components/PendingNote';
import { useDispatch, useSelector } from 'react-redux';
import { sendNoteToBoard, onClickChangeInfo } from './apiPendingScreen';
import { styles } from '../../../assets/styles/styles';

const PendingScreen = () => {
  const { pendingNotes } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const animatedValues = pendingNotes.map(() => new Animated.Value(200));

  const renderNotes = ({ item, index }) => {
    return (
      <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
        <PendingNote id={item.id} isInfo={item.isInfo} />
        <Pressable style={{alignItems: 'center'}}
          onPress={() => {
            sendNoteToBoard(item.id, item.text, dispatch,index,animatedValues);
          }}
        ><Text style={styles.approveNote}>Approve note</Text></Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.flexone}>
    <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
      <FlatList data={pendingNotes} renderItem={renderNotes} keyExtractor={(note) => note.id} />
    </Pressable>
    </View>
  );
};

export default PendingScreen;


import React from 'react';
import { Pressable, Button, FlatList, Animated,View } from 'react-native';
import { PendingNote } from '../../../components/PendingNote';
import { useDispatch, useSelector } from 'react-redux';
import { sendNoteToBoard, onClickChangeInfo } from '../logic/apiPendingScreen';
import Menu from '../../../components/Menu'

const PendingScreen = ({navigation}) => {
  const { pendingNotes } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const animatedValues = pendingNotes.map(() => new Animated.Value(200));

  const renderNotes = ({ item, index }) => {
    return (
      <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
        <PendingNote id={item.id} text={item.text} isInfo={item.isInfo} />
        <Button
          title={`Approve note | ID: ${item.id}`}
          onPress={() => {
            sendNoteToBoard(item.id, item.text, dispatch,index,animatedValues);
          }}
        />
      </Animated.View>
    );
  };

  return (
    <View style={{flex:1}}>
      {/* <Menu navigation={navigation}/> */}
    <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={{flex:1}}>
      <FlatList data={pendingNotes} renderItem={renderNotes} keyExtractor={(note) => note.id} />
    </Pressable>
    </View>

  );
};

export default PendingScreen;


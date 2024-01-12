import React from 'react';
import { Pressable, FlatList,View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onClickChangeInfo } from './onClickChangeInfo';
import { styles } from '../../../assets/styles/styles';
import { KEY_EXTRACTOR_NOTES } from '../../constants';
import { renderNotes } from './renderNotes';

const PendingScreen = () => {
  const { pendingNotes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <View style={styles.flexone}>
    <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
      <FlatList data={pendingNotes} renderItem={({item,index})=>renderNotes({item,index},pendingNotes,dispatch)} keyExtractor={KEY_EXTRACTOR_NOTES} />
    </Pressable>
    </View>
  );
};

export default PendingScreen;


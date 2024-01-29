import React from 'react';
import { Pressable, FlatList,View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onClickChangeInfo } from '../functions/onClickChangeInfo';
import { styles } from '../../../../assets/styles/styles'
import { KEY_EXTRACTOR_NOTES } from '../../../constants';
import { renderNotes } from '../functions/renderNotes';

const PendingScreen = () => {
  const { pendingNotes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  return (
    <View style={styles.flexone}>
      <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
        <FlatList numColumns={2} data={pendingNotes} renderItem={({item,index})=>renderNotes({item,index},pendingNotes)} keyExtractor={KEY_EXTRACTOR_NOTES} />
      </Pressable>
    </View>
  );
};

export default PendingScreen;


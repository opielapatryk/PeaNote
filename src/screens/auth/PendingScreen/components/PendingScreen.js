import React from 'react';
import { Pressable, FlatList,View,Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onClickChangeInfo } from '../functions/onClickChangeInfo';
import { styles } from '../../../../assets/styles/styles'
import { KEY_EXTRACTOR_NOTES } from '../../../constants';
import { renderNotes } from '../functions/renderNotes';
import { useFocusEffect } from '@react-navigation/native';
import { clearPendingInfo } from '../../../../store/notes/boardSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PendingScreen = () => {
  const { pendingNotes } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      return ()=>{
        dispatch(clearPendingInfo());
      }
    }, [])
  );
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      paddingTop: insets.top,
      flex: 1,
      backgroundColor:'#FFFDF3'
    }}>
      <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
      {pendingNotes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={pendingNotes} renderItem={({item})=>renderNotes({item})} keyExtractor={KEY_EXTRACTOR_NOTES} />
      </Pressable>
    </View>
  );
};

export default PendingScreen;


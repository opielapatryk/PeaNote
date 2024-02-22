import React from 'react';
import { Pressable, FlatList,View,Text,Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onClickChangeInfo } from '../functions/onClickChangeInfo';
import { styles } from '../../../../../assets/styles/styles'
import { renderNotes } from '../functions/renderNotes';
import { useFocusEffect } from '@react-navigation/native';
import { clearPendingInfo,showAddNoteModal } from '../../../../store/notes/boardSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AddNoteModal from '../../BoardScreen/components/AddNoteModal';


const PendingScreen = () => {
  const { pendingNotes,addNoteModal } = useSelector((state) => state.board);

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
      <AddNoteModal modalVisible={addNoteModal} setModalVisible={showAddNoteModal} board={"pending"}/>
      <Pressable onPress={() => onClickChangeInfo(dispatch, pendingNotes)} style={styles.board}>
      {pendingNotes.length==0&&<Text style={styles.emptyBoardText}>THIS BOARD IS EMPTY</Text>}
        <FlatList numColumns={2} data={pendingNotes} renderItem={({item})=>renderNotes({item})} keyExtractor={(note) => note.id} />
      </Pressable>
      <View style={{ position: 'absolute', bottom: Dimensions.get('window').width / 20, right: Dimensions.get('window').width / 20 }}>
        <Pressable
          onPress={() => {
            dispatch(showAddNoteModal(true));
          }}
          style={{
            width: Dimensions.get('window').width / 10,
            height: Dimensions.get('window').width / 10,
            backgroundColor: 'rgba(255, 100, 0, 0.5)',
            borderRadius: Dimensions.get('window').width / 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AntDesign name="pluscircle" size={Dimensions.get('window').width / 10} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingScreen;


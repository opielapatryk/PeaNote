import React,{useState} from 'react';
import {Pressable,View,Text,Button,FlatList} from 'react-native';
import {PendingNote} from '../../../components/PendingNote'
import {styles} from '../../../assets/styles/styles';
import { useDispatch, useSelector} from 'react-redux';
import {sendNoteToBoard,onClickChangeInfo} from '../logic/apiPendingScreen'

const PendingScreen = () => {
    const {pendingNotes} = useSelector((state)=>state.board)
    const dispatch = useDispatch()
    const [fetched, setFetched] = useState(false)

    const renderNotes = ({item}) => {
      return (
        <View>
          <PendingNote id={item.id} text={item.text} isInfo={item.isInfo} />
          <Button title='Approve note' onPress={()=>sendNoteToBoard(item.id,setFetched,pendingNotes,dispatch,)}/>
        </View>
      )
    }

    return (
      <View>
        <Pressable onPress={()=>onClickChangeInfo(dispatch,pendingNotes)} style={styles.board}>
          {fetched && (
              <View>
                <Text>Note has been sent to the board successfully!</Text>
              </View>
            )}
          <FlatList data={pendingNotes} renderItem={renderNotes} keyExtractor={note => note.id}/>
        </Pressable>
      </View>
      );
    };
export default PendingScreen;
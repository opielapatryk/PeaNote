import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {userLink,stickerLink} from '../../../components/Constants'
import {removePendingNote,changePendingInfo, addNote} from '../../../store/notes/boardSlice';

export async function sendNoteToBoard(stickerID,stickerContent,setFetched,dispatch,){
  const currentUserId = await SecureStore.getItemAsync('userId');
    try {
        const resp = await axios.get(userLink(currentUserId))

        let stickersOnBoard = resp.data.stickersOnBoard;
        let pending = resp.data.pending;

        stickersOnBoard.push(stickerLink(stickerID))

        let newPendingArr = await pending.filter(sticker => sticker != stickerLink(stickerID))

        const patchStickersOnBoardResp = await axios.patch(userLink(currentUserId),{
          'stickersOnBoard': stickersOnBoard
        })

        const patchPendingStickersResp = await axios.patch(userLink(currentUserId),{
          'pending': newPendingArr
        })

        if(patchStickersOnBoardResp.status === 200 && patchPendingStickersResp.status === 200){
            setFetched(true) 
            dispatch(addNote({ id: stickerID, text: stickerContent, isInfo: false }))
            dispatch(removePendingNote(stickerID))
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const onClickChangeInfo = (dispatch,pendingNotes) => {
  pendingNotes.map((note) => {
    if(note.isInfo === true)
    {
      dispatch(changePendingInfo(note.id))
    }
  })
}
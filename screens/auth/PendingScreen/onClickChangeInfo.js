import {changePendingInfo} from '../../../store/notes/boardSlice';

export const onClickChangeInfo = (dispatch,pendingNotes) => {
    pendingNotes.map((note) => {
      if(note.isInfo === true)
      {
        dispatch(changePendingInfo(note.id))
      }
    })
  }
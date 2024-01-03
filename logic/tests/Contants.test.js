// import {signOutAndClearReduxStore}from '../funcMenu'
import { useDispatch,useSelector } from 'react-redux';
import {removeNote,removePendingNote,addNote,addPendingNote} from '../../store/notes/boardSlice'

describe('Testing sign out function', () => {
   test('create note and pending note', () => {
      const { notes, pendingNotes } = useSelector((state)=>state.board)
      const dispatch = useDispatch() 

      dispatch(addNote({ id: 1, text: 'test note', isInfo: false }))
      dispatch(addPendingNote({ id: 1, text: 'test pending note', isInfo: false }))

      expect(notes).toBe([{ id: 1, text: 'test note', isInfo: false }])
      expect(pendingNotes).toBe([{ id: 1, text: 'test pending note', isInfo: false }])
     })
});

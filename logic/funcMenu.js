import {removeNote} from '../store/notes/boardSlice';

export const clearReduxStore = (notes,dispatch_redux,navigation) => {
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
    navigation.navigate('Pending');
  };

export const signOutAndClearReduxStore = (notes,signOut,dispatch_redux) => {
    signOut();
    notes.forEach(sticker => dispatch_redux(removeNote(sticker.id)));
};
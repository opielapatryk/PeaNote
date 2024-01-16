import auth from '@react-native-firebase/auth';

export const fetchAndDispatchStickers = (stickers, dispatch,addNoteAction) => {
    if(stickers){
      stickers.forEach((sticker,index) => {
        console.log('==============================================');
        console.log(auth().currentUser.email);
        console.log(sticker);
        console.log(index+1);
        console.log('==============================================');
        dispatch(addNoteAction({ id: index + 1, text: sticker.content, isInfo: false }))
    });
    }
  };

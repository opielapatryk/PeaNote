export const fetchAndDispatchStickers = async (stickers, addNoteAction) => {
    if(stickers){
      stickers.forEach((sticker,index) => dispatch(addNoteAction({ id: index + 1, text: sticker.content, isInfo: false })));
    }
  };
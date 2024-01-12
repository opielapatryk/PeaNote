import { Animated, Easing } from 'react-native';

export const animate = (index,addNote,removeNote,animatedValues) => {
    Animated.timing(animatedValues[index], {
      toValue: 0,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start(async ()=>{
      if (addNote) {
        await addNote();
        console.log('note added to board screen redux store');
      }
      if (removeNote) {
        await removeNote();
        console.log('note removed from pending notes redux store');
      }
    });
  };
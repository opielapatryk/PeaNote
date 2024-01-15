import {Animated,Easing} from 'react-native'

export const animate = (index,animatedValues) => {
    Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: false,
    }).start();
};
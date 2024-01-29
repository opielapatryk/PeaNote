import { Animated } from 'react-native';
import { PendingNote } from '../components/PendingNote';

export const renderNotes = ({ item, index }, pendingNotes) => {
    const animatedValues = pendingNotes.map(() => new Animated.Value(200));

    return (
      <Animated.View style={{ overflow: 'hidden', maxHeight: animatedValues[index] }}>
        <PendingNote id={item.id} isInfo={item.isInfo} index={index} />
      </Animated.View>
    );
  };
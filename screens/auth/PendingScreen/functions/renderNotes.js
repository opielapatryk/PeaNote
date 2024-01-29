import { PendingNote } from '../components/PendingNote';

export const renderNotes = ({ item, index }) => {
    return (
      <PendingNote id={item.id} isInfo={item.isInfo}/>
    );
  };
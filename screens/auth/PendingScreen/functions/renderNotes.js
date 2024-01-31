import { PendingNote } from '../components/PendingNote';

export const renderNotes = ({ item }) => {
    return (
      <PendingNote id={item.id} isInfo={item.isInfo} content={item.text} creator={item.creator}/>
    );
  };
import {Note} from './Note'

export const renderNotes = ({item}) => {
    return (
      <Note id={item.id} isInfo={item.isInfo} />
    )
  }
import {Note} from '../../../components/Note'

export const renderNotes = ({item}) => {
    return (
      <Note id={item.id} isInfo={item.isInfo} />
    )
  }
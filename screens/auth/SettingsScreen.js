import { Text, View, Button } from 'react-native'
import React from 'react'

export default SettingsScreen = () => {
    return (
      <View>
        <Button title='ASK BEFORE STICKING NOTE'/>
        <Button title='MAKE BOARD PRIVATE'/>
        <Button title='CHANGE PASSWORD'/>
        <Button title='DELETE ACCOUNT'/>
      </View>
    )
}
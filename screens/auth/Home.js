import {Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import BoardScreen from './BoardScreen'

const Home = () => {
  const [users,setUsers] = useState([])

  useEffect(()=>{
    const loadUser = async()=>{
      try{
        const result = await axios.get(`http://127.0.0.1:8000/api/users/`)
        setUsers(result.data)
      }catch(e){
        alert(e.message)
      }
    }
    loadUser()
  },[])

  return (
    <ScrollView>
      <BoardScreen/>
      <Text>Friends:</Text>
      <ScrollView>
        {users.map((user)=>(
          <Text key={user.id}>{user.email}</Text>
        ))}
      </ScrollView>
    </ScrollView>

  );
}

export default Home
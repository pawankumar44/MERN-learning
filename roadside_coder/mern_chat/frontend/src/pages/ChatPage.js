import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChatProvider, { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {

  //   //we store data in state
  //   //creating state for chats with initial value [] array
  //   //chats we use to display the data
  //   //setChat will be used to change value of chats variables
  //   const [chats, setChats] = useState([])
 
  //   //getting data from api
  // const fetchChats = async () => {
  //   const {data} = await axios.get('/api/chat')
  //   // console.log(data)
  //   setChats(data)
  // }

  // //useEffect is a hook which runs when a component is rendered for the first time
  // useEffect(() => {
  //   fetchChats()
  // }, [])
  
  //take user state from context api
  //destructure user state from inside 
  const {user} = ChatState()

  return (
    //we use {} to wirte js inside react.js
    <div style={{width:"100%"}}>
        {/* {chats.map((chat)=>(
           <div key={chat._id}>{chat.chatName}</div> 
        ))} */}
        {user && <SideDrawer/>}
        <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh"
        p="10px">
          {user && <MyChats/>}
          {user && <ChatBox/>}
          </Box>
    </div>
  )
}

export default ChatPage
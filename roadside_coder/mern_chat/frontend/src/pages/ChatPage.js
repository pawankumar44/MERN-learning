import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ChatPage() {

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

  return (
    //we use {} to wirte js inside react.js
    <div>

        {/* {chats.map((chat)=>(
           <div key={chat._id}>{chat.chatName}</div> 
        ))} */}
    </div>
  )
}

export default ChatPage
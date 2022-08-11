import { useToast } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'

const MyChats = () => {
  const [loggedUser,setLoggedUser] = useState() //local state
  const {user,selectedChat,setSelectedChat,chats,setChats} = ChatState()
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      const {data} = await axios.get("/api/chat",config)
      setChats(data)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: "Failed to Load the search results",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, [])
  

  return (
    <div>MyChats</div>
  )
}

export default MyChats
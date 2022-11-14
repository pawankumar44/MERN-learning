import { Box, Button, Flex, FormControl, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSender,getSenderFull } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import { baseUrl } from '../global_varibale_function/gloabl_varibale'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import ScrollableChat from './ScrollableChat'
import "./styles.css"

const SingleChat = ({fetchAgain,setFetchAgain}) => {
   const {user,selectedChat,setSelectedChat} = ChatState()
   //state for all messages
   const [messages, setMessages] = useState([])
   const [loading, setLoading] = useState(false)
   const [newMessage, setNewMessage] = useState()
   const toast = useToast()

   const fetchMessages = async () => {
    if(!selectedChat){
      return
    }
    try {
      const config = {
        headers: {
          // "Content-type": "application/json",//since it is get request so it will not require content-type
          Authorization: `Bearer ${user.token}`,
        }
      }
      setLoading(true)
      const {data} = await axios.get(`${baseUrl}/api/message/${selectedChat._id}`,
      config)
      console.log(messages)
      setMessages(data)
      
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description:"Failed to send the Message",
        // description:error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
    }
   }

   useEffect(() => {
    fetchMessages()
   }, [selectedChat])//whenever selectedChat change fetech again also
   

   const sendMessage = async(event) => {
    if(event.key==="Enter" && newMessage)
    try {
      setNewMessage("")
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      const {data} = await axios.post(`${baseUrl}/api/message`,{
        content:newMessage,
        chatId:selectedChat._id
      },config)
      console.log(data)
      //what we are getting need to append it with the array of the messages
      setMessages([...messages,data])
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description:"Failed to send the Message",
        // description:error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })

    }
   }

   //pass e as event since it is taking event
   const typingHandler = (e) =>{
    setNewMessage(e.target.value)
    //typing indicator logic
   }

  return (
    <>
    {selectedChat ? (
        <>
        <Button onClick={()=>setSelectedChat("")} justifyContent="center" alignItems="center"><span style={{fontSize:"50px"}}>&#8592;</span></Button>
        
        {!selectedChat.isGroupChat ? (
        <>
          {getSender(user,selectedChat.users)}
          <ProfileModal user={getSenderFull(user,selectedChat.users)} />

        </>):
        (
          <>
          {selectedChat.chatName.toUpperCase()}
          <UpdateGroupChatModal 
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          fetchMessages = {fetchMessages}
          />
          </>
        )}
        <Box
        justifyContent="flex-end" d="flex" flexDir="column"
        p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg"
        overflowY="hidden">
          {/* messages here */}
          {loading ? (
            <Spinner/>
          ):(
            <div className='messages'>
              <ScrollableChat messages={messages} />
            </div>
          )}
          {/* input tag for chat input */}
          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            <Input  
            varient= "filled"
            bg="#E0E0E0"
            placeholder='Enter a message..'
            onChange={typingHandler}
            value={newMessage}/>
          </FormControl>
        </Box>
        </>
        
    ) : (
          <Flex justifyContent="center"><Text >Click on a user to start chat</Text></Flex>
    )}
    </>
  )
}

export default SingleChat
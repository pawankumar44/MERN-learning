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
import io from 'socket.io-client'

// const ENDPOINT = "http://localhost:5000"; 
const ENDPOINT = "https://fliob.herokuapp.com/"; 
var socket, selectedChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain}) => {
   const {user,selectedChat,setSelectedChat,notification,setNotification} = ChatState()
   //state for all messages
   const [messages, setMessages] = useState([])
   const [loading, setLoading] = useState(false)
   const [newMessage, setNewMessage] = useState()
   const [socketConnected, setSocketConnected] = useState(false)
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
      socket.emit('join chat',selectedChat._id)
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

   //start the socket here
   useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup",user)
    socket.on('connection',()=>setSocketConnected(true))
   }, [])

   useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedChat//just to keep backup of state of selectedChat
   }, [selectedChat])//whenever selectedChat change fetech again also
   
  //  console.log(notification,"-------------------")
   useEffect(() => {
    //monitor the socket to see if we recieve anything from the socket
    //if received then put it in a chat
    socket.on("message recieved",(newMessageRecieved)=>{
      //if there is nothing inside selected chat or chat doesn't match the currently selected chat
      //
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        //give notification
        //notification array doesn't contain the message comming in
        if(!notification.includes(newMessageRecieved)){
          setNotification([newMessageRecieved,...notification])
          console.log(notification)
          //update list of chat
          setFetchAgain(!fetchAgain) 
        }
      }else{
        setMessages([...messages,newMessageRecieved])
      }
    })
   })//square brackets removed to update every time
   

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
      socket.emit('new message',data)
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
import { Avatar, Box, Button, Center, Flex, FormControl, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSender,getSenderFull,getSenderdetail } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import { baseUrl } from '../global_varibale_function/gloabl_varibale'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import ScrollableChat from './ScrollableChat'
import "./styles.css"
import io from 'socket.io-client'
import { capitalizeFirst } from '../config/Functions'
import { ArrowLeftShort } from "react-bootstrap-icons";


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

  //  const senderId = getSenderdetail(user,selectedChat.users)

  return (
    <>
    {selectedChat ? (
        <>
        <Box d='flex' h='60px' alignItems={'center'} w={{base:"100%",md:"68%"}}>
        <Button onClick={()=>setSelectedChat("")} justifyContent="center" bgColor={'transparent'} alignItems="center">
          {/* &#8592; */}
          <ArrowLeftShort color='black' size={40} />
          </Button>
        
        {!selectedChat.isGroupChat ? (
          
        <>
          <ProfileModal user={getSenderdetail(user,selectedChat.users)}
           children={
            <Box d='flex' alignItems={'center'}>
              <Avatar size="sm" cursor="pointer"
               name={getSenderdetail(user,selectedChat.users).name}
           src={getSenderdetail(user,selectedChat.users).pic}></Avatar>
           <Box w={'2'}></Box>
          {capitalizeFirst(getSender(user,selectedChat.users))}
            </Box>
           } />
        </>):
        (
          <>
          <UpdateGroupChatModal 
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          fetchMessages = {fetchMessages}
           children={
            <Box d='flex' alignItems={'center'}>
              <Avatar size="sm" cursor="pointer"
               name={selectedChat.chatName}
           src={selectedChat.chatName}></Avatar>
           <Box w={'2'}></Box>
          <strong>{capitalizeFirst(selectedChat.chatName)}</strong>
            </Box>
           } />

          {/* <strong>{capitalizeFirst(selectedChat.chatName)}</strong>
          <UpdateGroupChatModal 
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
          fetchMessages = {fetchMessages}
          /> */}
          </>
        )}
        </Box>

        <Box
        justifyContent="flex-end" d="flex" flexDir="column"
        p={2} bg="#E8E8E8" w="100%" h="79.6vh" borderRadius="0"
        overflowY="hidden">
          {/* messages here */}
          {loading ? (
            <Spinner color='blue'/>
          ):(
            <div className='messages'>
              <ScrollableChat messages={messages} />
            </div>
          )}
          {/* input tag for chat input */}
          <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            <Input  
            varient= "filled"
            // bg="#E0E0E0"
            bg={'white'}
            placeholder='Enter a message..'
            onChange={typingHandler}
            value={newMessage}/>
          </FormControl>
        </Box>
        </>
        
    ) : (
          <Box
            position="absolute"
            top="45%"
            left="50%"
            transform="translateY(-50%, -50%)"
          >
            <Text align={'center'} fontSize={'3xl'} letterSpacing={'wider'} fontWeight={'bold'} fontFamily="work sans" color={'black'}>
            Welcome to Fliob
            </Text>
            <Text align={'center'}>Select chat or search user to start chatting</Text>
          </Box>
    )}
    </>
  )
}

export default SingleChat
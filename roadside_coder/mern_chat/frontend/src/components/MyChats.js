import { useToast, Box,Text, Flex, Spacer, Button, Stack, Show, Hide } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogics'
import GroupChatModal from './miscellaneous/GroupChatModal'

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState() //local state
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      const { data } = await axios.get("/api/chat", config)
      setChats(data)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: "Failed to Load the search results",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, [fetchAgain]//whenever fetchchats changes the useEffects will run again
  )


  return (
      // <Hide below={selectedChat ? 'md': ''}>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        h="90vh"
        w={{ base: "100%", md: "31%" }}
        // borderRadius="lg"
        borderWidth="1px"
      >
        <Box paddingInline={3} d="flex" width={'100%'} alignContent={'space-between'} flexDir = "row">
          {/* <Text >My Chats</Text> */}
          <Text fontSize={'2xl'} letterSpacing={'wider'} fontWeight={'bold'} fontFamily="work sans" color={'black'}>
          Chats</Text>
          <Spacer />
          <GroupChatModal>
          {/* <Button>New Group Chat&nbsp;<i class="fa-solid fa-plus"></i></Button> */}
          <Button>Group&nbsp;<i class="fa-solid fa-plus"></i></Button>
          </GroupChatModal>
        </Box>

        <Box
        d="flex"
        flexDir = "column"
        p={0}
        mt={3}
        // bg="#F8F8F8"
        w="100%"
        h="77vh"
        borderRadius="lg"
        overflowY="hidden"
        >
          {/* check if something inside chat array then do something */}
          {chats? (
            <Stack overflowY="scroll">
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  {/* <Avatar size="sm" cursor="pointer" name={user.name}src={user.pic}></Avatar> */}
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
              {chats.map((chat)=>(
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ):(
            <ChatLoading/>
          )}
        </Box>
      </Box>
      // </Hide>
  )
}

export default MyChats
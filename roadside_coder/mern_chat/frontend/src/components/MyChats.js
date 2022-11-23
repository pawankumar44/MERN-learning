import { useToast, Box,Text, Flex, Spacer, Button, Stack, Show, Hide, Avatar } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import ChatLoading from './ChatLoading'
import { getSender, getSenderdetail } from '../config/ChatLogics'
import GroupChatModal from './miscellaneous/GroupChatModal'
import { capitalizeFirst } from '../config/Functions'

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
                  d='flex'
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "white"}
                  color= {selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                >
                  <Avatar size="sm" 
                  name={!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName} 
                  src={!chat.isGroupChat?getSenderdetail(loggedUser,chat.users).pic:chat.chatName}
                  ></Avatar>
                  <Box width={'7px'}></Box>
                  <Text mt={'4px'}>
                    {!chat.isGroupChat?capitalizeFirst(getSender(loggedUser,chat.users)):capitalizeFirst(chat.chatName)}
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
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender,getSenderFull } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
   const {user,selectedChat,setSelectedChat} = ChatState()
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
          />
          </>
        )}
        <Box
        justifyContent="flex-end" d="flex" flexDir="column"
        p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg"
        overflowY="hidden"></Box>
        </>
        
    ) : (
          <Flex justifyContent="center"><Text >Click on a user to start chat</Text></Flex>
    )}
    </>
  )
}

export default SingleChat
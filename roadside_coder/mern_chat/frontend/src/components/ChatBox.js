import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {selectedChat} = ChatState()
  return (
    //set on base screen and medium screen
    <Box
     d={{base:selectedChat ? "flex" : "none", md:"flex" }}
    //  alignItems="center"
     flexDir="column"
     p={0}
     bg="white"
    //  w='100%'
     w={{base:"100%",md:"68%"}}
    //  borderRadius="lg"
     borderWidth="1px" overflowY="hidden">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
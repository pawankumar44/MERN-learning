import { Box, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack>
        <Box p="5px"></Box>
       <Skeleton height="45px"/> 
       <Skeleton height="45px"/> 
       <Skeleton height="45px"/> 
       <Skeleton height="45px"/> 
       <Skeleton height="45px"/> 
       <Skeleton height="45px"/> 
       <Skeleton height="45px"/> 
    </Stack>
  )
}

export default ChatLoading
import { Box, CloseButton } from '@chakra-ui/react'
import React from 'react'
import { capitalizeFirst } from '../../config/Functions'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={12}
    backgroundColor="purple"
    color="white"
    cursor="pointer"
    onClick={handleFunction}>
        {capitalizeFirst(user.name)}
        <span>&#10060;</span>
    </Box>
    
  )
}

export default UserBadgeItem
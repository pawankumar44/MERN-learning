import { Avatar, Box, color, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user, handleFunction}) => {
  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg="#E8E8E8"
    // _hover={{
    //   background: "#38B2AC"
    //   color: "white"  
    // }}
    w="100%"
    mt={2}
    color="black">
        <Flex alignItems="center" borderRadius="lg" py={2} px={3}>
            <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}/>

        <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs">
                <b>Email: </b>
                {user.email}
            </Text>
        </Box>
        </Flex>
    </Box>
  )
}

export default UserListItem
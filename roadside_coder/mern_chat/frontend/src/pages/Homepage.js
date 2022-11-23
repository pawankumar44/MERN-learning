import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Image, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'

function Homepage() {
  //if user is logged in push him back to the chat page
  const navigate = useNavigate()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if(user)navigate("/chats")
  },[navigate])
  return (
    //container in chakra adust according to screen size
    <Container maxW='xl' centerContent>
      {/* <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="30px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      ><Text fontSize={'4xl'} fontFamily="work sans" color={'black'}>
          Chat-Pi</Text></Box> */}
        
      <Box bg="white" width="100%" p={4} backgroundColor={'transparent'} borderRadius="lg" borderWidth="0px">
      <Box
        d=""
        justifyContent="center"
        p={3}
        bg={"transparent"}
        w="100%"
        m="30px 0 15px 0"
        // borderRadius="1g"
        // borderWidth="1px"
      >
        <Box d="flex" justifyContent={'center'}>
        <Image boxSize={'40px'} src={ require('./logo.png') } alt='chat-icon' />
        <Text fontSize={'4xl'} textAlign={'center'} letterSpacing={'wider'} fontWeight={'bold'} fontFamily="work sans" color={'white'}>
          Fliob</Text>
        </Box>
          
          {/* <img src={ require('./logo.png') } /> */}
          <Divider borderColor={'transparent'}/>
          <Text fontSize={'2xl'} textAlign={'center'}  fontFamily="work sans" color={'white'}>
          a simple platform for chatting</Text>
          
          </Box>
        <Tabs variant='soft-rounded' >
          <TabList mb="1em">
            <Tab color={'whitesmoke'}>Login</Tab>
            <Tab color={'whitesmoke'}>Sign-up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <SignUp></SignUp>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
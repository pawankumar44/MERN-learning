import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="30px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      ><Text fontSize={'4xl'} fontFamily="work sans" color={'black'}>
          Chat-Pi</Text></Box>
        
      <Box bg="white" width="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' >
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign-up</Tab>
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
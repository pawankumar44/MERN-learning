import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Login from '../components/authentication/Login'
import SignUp from '../components/authentication/SignUp'

function Homepage() {
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
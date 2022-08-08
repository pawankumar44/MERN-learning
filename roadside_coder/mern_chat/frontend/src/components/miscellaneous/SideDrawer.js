import React,{useState} from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import {baseUrl} from '../../global_varibale_function/gloabl_varibale'
import axios from 'axios'
import ChatLoading from '../ChatLoading'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const {user} = ChatState()
  const navigate = useNavigate()
  const {isOpen, onOpen, onClose } = useDisclosure()//for side drawer
  const toast = useToast()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleSearch = async() => {
    if(!search){
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"top-left"
      })
      return
    }
    try {
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`${baseUrl}/api/user?search=${search}`,config)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: "Failed to Load the search results",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
      return
      setLoading(false)
    }
  }

  return (
    <> 
    <Box
    // d="flex"
    // justifyContent="space-between"
    // alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    >
      <Flex justifyContent="space-between">
      <Tooltip label="Search Users to Chat" hasArrow
       placement='bottom-end'>
        <Button variant="ghost" onClick={onOpen}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <Text d={{base:"none",md:"flex"}} px='4'>Search User</Text>
        </Button>
       </Tooltip>
       <Text fontSize="2xl" fontFamily="Work sans">Texting</Text>
       <div>
        <Menu>
          <MenuButton p={1}>
          <i class="fa-solid fa-bell"></i>
          </MenuButton>
          <MenuList></MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} >
            <Avatar size="sm" cursor="pointer" name={user.name}
            src={user.pic}></Avatar>
            <i class="fa-solid fa-caret-down"></i>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
            <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider/>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
       </div>
      </Flex>
    </Box>
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
      <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
          <Flex>
            <Input
            placeholder='Search by name or email'
            mr={2}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}/>
            <Button onClick={handleSearch} >Go</Button>
            </Flex>
            {loading?(<ChatLoading/>):(<span>results</span>)}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer
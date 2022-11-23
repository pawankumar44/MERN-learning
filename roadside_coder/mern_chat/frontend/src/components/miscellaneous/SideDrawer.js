import React,{useState} from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Image, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import {baseUrl} from '../../global_varibale_function/gloabl_varibale'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../user_avatar/UserListItem'
import { getSender } from '../../config/ChatLogics'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const {user,setSelectedChat,chats,setChats,notification,setNotification} = ChatState()
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
      setSearchResult(data)
      // console.log({searchResult})
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
      setLoading(false)
      return
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
      const {data} = await axios.post(`${baseUrl}/api/chat`,{userId},config)
      //if chat is already in chat state which we are fetching inside mychats
      //we will append it 
      if(!chats.find((c)=> c._id === data._id)) setChats([data,...chats])
      setSelectedChat(data)
      setLoading(false)
      onClose()//close the drawer
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
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
    p="7px 10px 7px 10px"
    borderWidth="0px"
    >
      <Flex justifyContent="space-between">
      <Tooltip label="Search Users to Chat" hasArrow
       placement='bottom-end'>
        <Button variant="ghost" onClick={onOpen}>
        <i class="fa-solid fa-magnifying-glass"></i>
        <Text d={{base:"none",md:"flex"}} px='4'>Search User</Text>
        </Button>
       </Tooltip>
       {/* <Text fontSize="2xl" fontFamily="Work sans">Texting</Text> */}
       <Box d='flex' flexDir={'row'}>
       <Image boxSize={'35px'} src={ require('../../pages/logo.png') } alt='chat-icon' />
       <Text fontSize={'2xl'} letterSpacing={'wider'} fontWeight={'bold'} fontFamily="work sans" color={'black'}>
          Fliob</Text>
       </Box>
       <div>

        <Menu>
          <MenuButton p={1}>
          <i class="fa-solid fa-bell"></i>
          </MenuButton>
          {notification.length && "New Message"}
          <MenuList pl={2}>
            {/* if there is no notifcation then say no new message */}
            {!notification.length && "No New Messages" }
            {/* else */}
            {notification.map(noti =>(
              <MenuItem
              key={noti._id}
              onClick={()=>{
                setSelectedChat(noti.chat)
                //remove from notification array
                //if n not equal to notification then don't filter else do
                setNotification(notification.filter((n)=>n!==noti))
              }}
              >
              {noti.chat.isGroupChat
                ? `New Message in ${noti.chat.chatName}`
                :`New Message from ${getSender(user,noti.chat.users)}`}
              </MenuItem>
            ))}
            </MenuList>
        </Menu>


        <Menu>
          <MenuButton bgColor={'transparent'} as={Button} >
            <Avatar size="sm" cursor="pointer" name={user.name}
            src={user.pic}></Avatar>
            {/* <i class="fa-solid fa-caret-down"></i> */}
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
            {loading?(<ChatLoading/>):
            //? check if anything inside searchResult
            (searchResult?.map(user=>(
              <UserListItem
              key={user._id}
              user = {user}
              handleFunction = {()=>accessChat(user._id)}/>
            )))}
          {/* when chat is loading  */}
          {loadingChat && <Spinner ml="auto" d="flex"/>}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer
import React,{useState} from 'react'
import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const {user} = ChatState()
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
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
        <Button variant="ghost">
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
    </>
  )
}

export default SideDrawer
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast,Box, Flex, FormControl, Input, Spinner } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { capitalizeFirst } from '../../config/Functions';
import { ChatState } from '../../Context/ChatProvider';
import { baseUrl } from '../../global_varibale_function/gloabl_varibale';
import UserBadgeItem from '../user_avatar/UserBadgeItem';
import UserListItem from '../user_avatar/UserListItem';

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessages,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    const toast = useToast()
    const {selectedChat,setSelectedChat, user} = ChatState()

    const handleRemove = async(user1) => {
      if(selectedChat.groupAdmin._id!==user._id
        //*user who is logged in doesn't match to the user who is trying to remove
        &&user1._id !==user._id){
        toast({
          title: 'Only admins can add someone!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        return
      }
      try {
        setLoading(true)
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data} = await axios.put(
          `${baseUrl}/api/chat/groupremove`,
          {
            chatId:selectedChat._id,
            userId:user1._id,
          },
          config
        )
        //when user left the group then make selected chat empty for him
        user1._id === user._id ? setSelectedChat(): setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        fetchMessages();//all messages get refreshed after removing from group
        setLoading(false)
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description:error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        setLoading(false)
      }
    }

    const handleAddUser = async (user1) => {
      if(selectedChat.users.find((u)=>u._id===user1._id)){
        toast({
          title: 'User Already in Group!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        return
      }
      if(selectedChat.groupAdmin._id!==user._id){
        toast({
          title: 'Only admins can add someone!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        return
      }
      try {
        setLoading(true)
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data} = await axios.put(`${baseUrl}/api/chat/groupadd`,
        {
          chatId : selectedChat._id,
          userId:user1._id,
        },config)
        setSelectedChat(data)
        setFetchAgain(!fetchAgain)
        setLoading(false)
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description:error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      }

    }

    const handleRename = async() => {
      if(!groupChatName) return
      try {
        setRenameLoading(true)
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data} = await axios.put(`${baseUrl}/api/chat/rename`,
        {chatId:selectedChat._id,
        chatName:groupChatName,},config)
        setSelectedChat(data)//set chat with new name
        setFetchAgain(!fetchAgain)
        setRenameLoading(false)
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description:error.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      }
      setGroupChatName("")
      onClose()
    }

    const handleSearch = async (query) => {
      setSearch(query)
      if(!query){
        return
      }
      try {
        setLoading(true)
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data} =  await axios.get(`${baseUrl}/api/user?search=${search}`,config)
        setSearchResult(data)
        setLoading(false)
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: "Failed to Load the search results",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom-left"
        })
        setLoading(false)
      }
  }

  return (
    <>
        {children ? (
        <span onClick={onOpen}>{children}</span>
    ):(
        <IconButton d={{base:"flex"}} onClick={onOpen}>
            <i class="fa-solid fa-eye"></i>
        </IconButton>
    )}
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{capitalizeFirst(selectedChat.chatName)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              {selectedChat.users.map(u=>(

                <UserBadgeItem key={user._id}
                user={u} handleFunction={()=>handleRemove(u)} />
              ))}
            </Flex>
            <FormControl>
              <Input
              placeholder='Chat Name'
              mb={3}
              value={groupChatName}
              onChange={(e)=>setGroupChatName(e.target.value)}
              />
              <Button
              isLoading={renameLoading}
              onClick={handleRename}>
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
              placeholder='Add user to group'
              mb={1}
              onChange={(e)=>handleSearch(e.target.value)}/>
            </FormControl>
            {loading ? (
              <Spinner size="lg"/>
            ):(
              searchResult?.map((user)=>(
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>handleAddUser(user)} />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' onClick={()=>handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
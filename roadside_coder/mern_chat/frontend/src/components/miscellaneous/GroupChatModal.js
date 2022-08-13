import React, { useState } from 'react'
import {Box, Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../user_avatar/UserListItem'
import {baseUrl} from '../../global_varibale_function/gloabl_varibale'
import UserBadgeItem from '../user_avatar/UserBadgeItem'

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()//contain group chat name
    const [selectedUsers, setSelectedUsers] = useState([])//contained selected users in empty array
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [ loading, setLoading] = useState(false)
    const toast = useToast()

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

    //add to selected users
    const handleGroup = async (userToAdd) => {
      //if selected users already have this
      if(selectedUsers.includes(userToAdd)){
        toast({
          title: 'User already added',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "top"
        })
        return
      }
      //otherwise add it to the array
      //spread all of the selected users already there and then add 
      setSelectedUsers([...selectedUsers,userToAdd])
    }

    const handleDelete = (delUser) => {
      //filter out of the selected users
      setSelectedUsers(
        selectedUsers.filter((sel)=>sel._id !== delUser._id))
    }

    const handleSubmit = async () => {
      if(!groupChatName || !selectedUsers){
        toast({
          title: 'Please fill all the fields',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "top"
        })
        return
      }
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data} = await axios.post(`${baseUrl}/api/chat/group`,{
          name:groupChatName,
          //remember it will take users array in stringify format
          users: JSON.stringify(selectedUsers.map((u)=>u._id))
        },config)
        //add group to our list of chats
        //... helps in adding to top of chats
        setChats([data, ...chats])
        onClose()//close the modal
        toast({
          title: 'New Group Chat Created',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      } catch (error) {
        toast({
          title: 'Failed to Create Group Chat',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
      }
    }

    //apend this group chat with other chats
    const {user,chats,setChats} = ChatState()//take out three things

    return (
        <>
          <span onClick={onOpen}>{children}</span>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                    <Input placeholder='Chat Name' 
                    mb={3}
                    onChange={(e)=> setGroupChatName(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <Input placeholder='Add Users eg: Tony, Natasha' 
                    mb={1}
                    onChange={(e)=> handleSearch(e.target.value)}/>
                </FormControl>
                {/* selected users */}
                <Flex
                 flexWrap="wrap"
                >{selectedUsers.map((u)=>(
                  <UserBadgeItem key={user._id}
                  user={u} handleFunction={()=>handleDelete(u)} />
                ))}</Flex>
                {/* render search user */}
                {loading ? (<div>loading...</div> ): (
                  //show only 4 results
                  searchResult ?.slice(0,4).map((user)=>(
                    <UserListItem key={user._id}
                    user={user}
                    handleFunction={()=>handleGroup(user)}/>
                  ))
                )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
                 </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
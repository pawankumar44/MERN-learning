import React, { useState } from 'react'
import {Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()//contain group chat name
    const [selectedUsers, setSelectedUsers] = useState([])//contained selected users in empty array
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleSearch = () => {
        
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
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast,Box, Flex, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../user_avatar/UserBadgeItem';

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)
    const toast = useToast()
    const {selectedChat,setSelectedChat, user} = ChatState()

    const handleRemove = () => {}
    const handleRename = () => {}
    const handleSearch = () => {}

  return (
    <>
    <IconButton d={{base:"flex"}} onClick={onOpen}>
            <i class="fa-solid fa-eye"></i>
        </IconButton>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
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
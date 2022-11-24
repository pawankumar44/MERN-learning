import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { capitalizeFirst } from '../../config/Functions'

const ProfileModal = ({user,children}) => {
    const {isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    {children ? (
        <span onClick={onOpen}>{children}</span>
    ):(
        <IconButton d={{base:"flex"}} onClick={onOpen}>
            <i class="fa-solid fa-eye"></i>
        </IconButton>
    )}
          <Modal size="lg" isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{capitalizeFirst(user.name)}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Image 
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}>
            </Image>
            <Text><strong>Email:</strong> {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
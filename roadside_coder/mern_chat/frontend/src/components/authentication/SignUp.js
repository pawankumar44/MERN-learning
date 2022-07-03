import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    //we use state here instead of variable to store value from form input
    const [show, setshow] = useState(false)
    const [name, setName] = useState()//() in this we insert the default value
    const [email, setEmail] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()

    const postDetails = (pics) => {}

    const submitHandler = () => {}

  return (
    <VStack spacing="5px">
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name'
            onChange={(e)=>setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input type={show ?  "text": "password"}
             placeholder='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
                <Button height="1.75rem" size="sm"
                 onClick={()=>setshow(!show)}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='confirm-password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input type={show ?  "text": "password"}
             placeholder='Enter Password Again'
            onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
            <InputRightElement width="4.5rem">
                <Button height="1.75rem" size="sm"
                 onClick={()=>setshow(!show)}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='pic' isRequired>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input p={1.5}
            type="file" accept='images/*'
            onChange={(e)=> postDetails(e.target.files[0])}></Input>
        </FormControl>

        <Button colorScheme="blue" width="100%"
         style={{marginTop : 15}} onClick={submitHandler}>Sign Up</Button>
    </VStack>
  )
}

export default SignUp
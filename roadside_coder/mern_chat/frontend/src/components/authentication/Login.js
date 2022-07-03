import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
    //we use state here instead of variable to store value from form input
    const [show, setshow] = useState(false)//() in this we insert the default value
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const submitHandler = () => { }

    return (
        <VStack spacing="5px">
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}></Input>
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"}
                        placeholder='Enter Password'
                        onChange={(e) => setPassword(e.target.value)}></Input>
                    <InputRightElement width="4.5rem">
                        <Button height="1.75rem" size="sm"
                            onClick={() => setshow(!show)}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme="blue" width="100%"
                style={{ marginTop: 15 }} onClick={submitHandler}>Login</Button>

            <Button colorScheme="red" variant="solid" width="100%"
                style={{ marginTop: 15 }}
                 onClick={()=>{
                    setEmail('guest@example.com')
                    setPassword('123456')
                 }}>
                    Get Gusest User Credentials</Button>

        </VStack>
    )
}

export default Login
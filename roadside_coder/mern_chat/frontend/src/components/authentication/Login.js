import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    //we use state here instead of variable to store value from form input
    const [show, setshow] = useState(false)//() in this we insert the default value
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()//for navigating after registration or login


    const submitHandler = async () => {
        if(!email || !password){
            toast({
                title: 'Please Fill all fields',
                description: "",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              return;
        }
        try {
            setLoading(true)
            const config = {
                headers : {
                    "Content-type" : "application/json"
                },
            }
            const {data} = await axios.post(
                "/api/user/login",{email,password},
                config
            )
            setLoading(false)
            toast({
                title: 'Login successful',
                description: "",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              localStorage.setItem("userInfo",JSON.stringify(data))
              navigate('/chats')
        } catch (error) {
            setLoading(false)
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
        }
     }

    return (
        <VStack spacing="5px">
            <FormControl id='email' isRequired>
                <FormLabel color={'white'}>Email</FormLabel>
                <Input backgroundColor={'white'} placeholder='Enter Your Email'
                value={email}
                    onChange={(e) => setEmail(e.target.value)}></Input>
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>
                    <Input backgroundColor={'white'} type={show ? "text" : "password"}
                        placeholder='Enter Password'
                        value={password}
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

            {/* <Button colorScheme="red" variant="solid" width="100%"
                style={{ marginTop: 15 }}
                 onClick={()=>{
                    setEmail('guest@example.com')
                    setPassword('123456')
                 }} isLoading = {loading}>
                    Get Gusest User Credentials</Button> */}

        </VStack>
    )
}

export default Login
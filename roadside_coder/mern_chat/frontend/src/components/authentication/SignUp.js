import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { set } from 'mongoose'

const SignUp = () => {
    //we use state here instead of variable to store value from form input
    const [show, setshow] = useState(false)
    const [name, setName] = useState()//() in this we insert the default value
    const [email, setEmail] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()//we will use cloudinary for saving images
    //loading state
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()//for navigating after registration or login

    const postDetails = (pics) => {
        setLoading(true)
        if(pics===undefined){
            toast({
                title: 'Please Select an Image',
                description: "",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              setLoading(false)
              return;
        }
        //check if its image or not
        if(pics.type ==="image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            //procedure for uploading on cloudinary
            data.append("file",pics);
            data.append("api_key","765436697374783")
            data.append("upload_preset","chat-app");
            data.append("cloud_name","dmxoc5z9q")//project name
            //make api call
            fetch("https://api.cloudinary.com/v1_1/dmxoc5z9q/image/upload",{
                method: "post",
                body:data,
            }).then((res)=>res.json())
            .then((data)=>{
                console.log(data)
                setPic(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            })
        }
        else{
            toast({
                title: 'Please Select an Image',
                description: "",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              setLoading(false)
              return;
        }
    }

    const submitHandler = async() => {
        // setLoading(true)
        if(!name || !email || !password || !confirmPassword){
            toast({
                title: 'Please fill all the fields',
                description: "",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              return;
        }
        if(password !== confirmPassword){
            toast({
                title: 'Passwords don\'t match',
                description: "",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              return;
        }
        //do api request to store this into database
        setLoading(true)
        try {
            //set headers for the request
            const config = {
                headers : {
                    "Content-type" : "application/json"
                }
            }
            const {data} = await axios.post("/api/user",{
                name,email,password,pic
            },config)
            toast({
                title: 'Registration Successful',
                description: "",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
            //now take this data and store it into local storage
            localStorage.setItem('userInfo',JSON.stringify(data))
            setLoading(false)
            //push user to the chat page
            navigate('/chats')

        } catch (error) {
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"bottom"
              })
              setLoading(false)
        }
    }

  return (
    <VStack spacing="5px">
        <FormControl id='first-name' isRequired>
            <FormLabel color={'white'}>Name</FormLabel>
            <Input backgroundColor={'white'} placeholder='Enter Your Name'
            onChange={(e)=>setName(e.target.value)}></Input>
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel color={'white'}>Email</FormLabel>
            <Input backgroundColor={'white'} placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel color={'white'}>Password</FormLabel>
            <InputGroup>
            <Input backgroundColor={'white'} type={show ?  "text": "password"}
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
            <FormLabel color={'white'}>Confirm Password</FormLabel>
            <InputGroup>
            <Input backgroundColor={'white'} type={show ?  "text": "password"}
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
            <FormLabel color={'white'}>Upload Your Picture</FormLabel>
            <Input backgroundColor={'white'} p={1.5}
            type="file" accept='images/*'
            onChange={(e)=> postDetails(e.target.files[0])}></Input>
        </FormControl>

        <Button colorScheme="blue" width="100%"
         style={{marginTop : 15}} onClick={submitHandler}
          isLoading = {loading}>Sign Up</Button>
    </VStack>
  )
}

export default SignUp
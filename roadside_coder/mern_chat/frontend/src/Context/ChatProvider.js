import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

//create context
const ChatContext = createContext()

//chat provider which will wrap whole of the app
//so that whatever state inside of context api can be accessible by whole of app
const ChatProvider = ({children}) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    //fetch our local storage
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if(!userInfo){
            navigate("/")
        }
    },[navigate])//whenever navigate changes it will run again
    return 
        <ChatContext.Provider
        value={{user,setUser}}>{children}</ChatContext.Provider>
    
}

//make state availabe to other parts of the app (useContext hook)
export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider
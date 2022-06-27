import React from 'react'
import {useNavigate} from 'react-router-dom'


async function Checklog(props) {
    
    const navigate = useNavigate();
    
    if(props.val==true){
        return(
           await navigate('../login')
        )
    }
    if(props.val==false){
        return(
           await navigate('../signup')
        )
    }
}

export default Checklog
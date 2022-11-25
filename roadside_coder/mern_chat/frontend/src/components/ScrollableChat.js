import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import {Tooltip,Avatar,Box} from '@chakra-ui/react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import {ChatState} from '../Context/ChatProvider'

const ScrollableChat = ({messages}) => {
  //to get logged in user data
  const {user} = ChatState();
  return (
    <ScrollableFeed>
      {/* if somethine inside of the messages then render messages */}
      {/* map the current messages by taking m as massage whith i as index */}
      {messages && messages.map((m,i)=>(
        <div style={{display:"flex"}} key={m._id}>
          {//if this or 
            (isSameSender(messages,m,i,user._id)
            || isLastMessage(messages,i,user._id))
            && (<Tooltip 
              label= {m.sender.name}
              placement="bottom-start"
              hasArrow>
                {/* render the avatar of user */}
                <Avatar
                mt="7px"
                mr={1}
                size = "sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.pic}
                />
            </Tooltip>)}
            {/* messages */}
              <span style={{
              backgroundColor: `${
                m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
              }`,
              borderRadius : "5px",
              // paddinf: "5px 15px",
              padding:" 5px 5px 5px 5px",
              maxWidth: "75%",
              marginLeft: isSameSenderMargin(messages,m,i,user._id),
              marginTop: isSameUser(messages,m,i,user._id) ? 3 : 10,
            }}>
              {m.content}
            </span>
            {/* {//if this or 
            (isSameSender(messages,m,i,user._id)
            || isLastMessage(messages,i,user._id))
            && (<span style={{}}>{m.sender.name}</span>)} */}
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({messages}) => {
  return (
    <ScrollableFeed>
      {/* if somethine inside of the messages then render messages */}
      {/* map the current messages by taking m as massage whith i as index */}
      {messages && messages.map((m,i)=>(
        <div style={{display:"flex"}} key={m._id}>
          m.content
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
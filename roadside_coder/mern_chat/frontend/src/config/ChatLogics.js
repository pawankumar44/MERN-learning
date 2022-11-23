export const getSender = (loggedUser,users)=>{
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name
}

export const getSenderFull = (loggedUser,users)=>{
    return users[0]._id === loggedUser._id ? users[1] : users[0].name
}

export const getSenderdetail = (loggedUser,users)=>{
    return users[0]._id === loggedUser._id ? users[1] : users[0]
}


// messages = all of our message
// m = the current message
//i = index of the current message 
//userId = logged in user id
export const isSameSender = (messages,m,i,userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i+1].sender._id !== m.sender._id ||
            messages[i+1].sender._id === undefined) &&
            messages[i].sender._id !== userId
    )
}

export const isLastMessage = (messages,i,userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId 
        && messages[messages.length - 1].sender._id // message should exist
    )
}

//for seperating alignment of chat messages

//for margin between chats
export const isSameSenderMargin = (messages,m,i,userId) => {
    if(
        i<messages.length - 1 && 
        messages[i+1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId//user exist
    )
        return 33;
    else if (
        (i< messages.length-1 &&
            messages[i+1].sender._id !== m.sender._id && 
            messages[i].sender._id !== userId ||
            (i=== messages.length-1 && messages[i].sender._id!== userId))
    )
            return 0;
    else return "auto";
};

export const isSameUser = (messages,m,i) => {
    return i > 0 && messages[i-1].sender._id === m.sender._id
}
//to use state inside function we hook called useState
import { useState } from "react"



// // we will make tasks as part of our state
// const tasks = [
//     {
//         id:1,
//         text:'Doctors Appointment',
//         day: 'feb 5th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id:2,
//         text:'Meeting at school',
//         day: 'feb 5th at 2:30pm',
//         reminder: true,
//     },
//     {
//         id:3,
//         text:'Food Shopping',
//         day: 'feb 5th at 2:30pm',
//         reminder: false,
//     },
// ]

const Task = () => {
    const [tasks,setTasks] = useState([
    {
        id:1,
        text:'Doctors Appointment',
        day: 'feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id:2,
        text:'Meeting at school',
        day: 'feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id:3,
        text:'Food Shopping',
        day: 'feb 5th at 2:30pm',
        reminder: false,
    },
    ])
    return (
        <>
        {/* each task from tasks is task */}
            {tasks.map((task)=>(
                //we need to add key each to get rid from warnings
                <h3 key={task.id} >{task.text}</h3>
            ))}
        </>
    )
}

export default Task

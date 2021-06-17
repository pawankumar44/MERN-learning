//to use state inside function we hook called useState
import { useState } from "react"
import EachTask from "./EachTask"



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

const Task = ({tasks,onDelete}) => {

    return (
        <>
        {/* each task from tasks is task */}
        {tasks.map((task)=>(
            <EachTask key={task.id} eachTask={task} onDelete={onDelete} />
        ))}
        </>
    )
}

export default Task

import Header from "./components/Header"; //importing custom header
import React from "react";
import Task from "./components/Tasks";
//to use state inside function we hook called useState
//useEffect do something when page load
import { useState,useEffect } from "react"
import  AddTask  from "./components/AddTask";

//by using function 
function App() {

  //to toggle Add task form
  const[showAddTask,setShowAddTask] = useState(false)

    const [tasks,setTasks] = useState([
    ])

  // const [tasks,setTasks] = useState([
  //   {
  //       id:1,
  //       text:'Doctors Appointment',
  //       day: 'feb 5th at 2:30pm',
  //       reminder: true,
  //   },
  //   {
  //       id:2,
  //       text:'Meeting at school',
  //       day: 'feb 5th at 2:30pm',
  //       reminder: true,
  //   },
  //   {
  //       id:3,
  //       text:'Food Shopping',
  //       day: 'feb 5th at 2:30pm',
  //       reminder: false,
  //   },
  //   ])

  //get tasks list from mock api
  useEffect(()=>{
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  },[])// [] dependency array used to pass own value

  //fetch tasks from api
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //fetch single task for toggle reminder persistently
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

    //Add Task
    const addTask = async (task) =>{
      const id = Math.floor(Math.random()*1000)+1
      const newTask = {id,...task}
      //persistenly add data in json file
      const res = await fetch('http://localhost:5000/tasks',
      {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(newTask),
      }
      )

      const data = await res.json() // new data
      setTasks([...tasks,data])


      // //need to generate id because we are not dealing with backend here
      // const id = Math.floor(Math.random()*1000)+1
      // //preparing new task to add
      // const newTask = {id,...task} //...task will copy the remaining from parameter
      // setTasks([...tasks,newTask])
    }

    //delete a task
    const deleteTask = async (id) =>{
      //this will delete from json permanently
      await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method:'DELETE'
      })

      setTasks(tasks.filter(
        (task)=>task.id !== id
      ))
    }

    //toggle reminder
    const togglerReminder = async(id) =>{
      //persistently toggle in json file
      const taskToToggle = await fetchTask(id)
      const updateTask = {...taskToToggle,
      reminder:!taskToToggle.reminder}

      //now update in json file
      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method:'PUT',//PUT for updating
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(updateTask)
      })

      //send response
      const data = await res.json()

      setTasks(
        tasks.map((task)=>task.id === id ? {
          ...task,reminder:data.reminder
        }:task)
      )

      // //this below is to change only in design
      // // 1st we change boolean value of the clicked task
      // setTasks(
      //   tasks.map((task)=>task.id === id ? {
      //     ...task,reminder:!task.reminder
      //   }:task)
      // )

    }

  return (
    <div className="container">
      {/* embed header from custom header function */}

      <Header
      changeAddButton={showAddTask}
       showAdd={()=>setShowAddTask(!showAddTask)} title='Task Tracker'/>

      {/* show add task form according to its visibility */}
      {showAddTask && <AddTask addTask={addTask} />}

      {tasks.length>0 ?
      (<Task tasks={tasks}
        onToggle={togglerReminder} onDelete={deleteTask}/>)
      :('No Task')}
      
    </div>
  );
}

// // by using class
// // react.component beacuse we need life cycle 
// class App extends React.Component{
//   //render takes care of output
//   render() {
//     return (
//       <div>
//         <h1>hello from class</h1>
//       </div>
//     )
//   }
// } 

export default App;


////just json data
// {
//   "tasks": [
//     {
//         "id":1,
//         "text":"Doctors Appointment",
//         "day": "feb 5th at 2:30pm",
//         "reminder": true
//     },
//     {
//         "id":2,
//         "text":"Meeting at school",
//         "day": "feb 5th at 2:30pm",
//         "reminder": true
//     },
//     {
//         "id":3,
//         "text":"Food Shopping",
//         "day": "feb 5th at 2:30pm",
//         "reminder": false
//     }
//   ]
// }
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
      const taskFromServer = await fetchTask()
      setTasks(taskFromServer)
    }
    getTasks()
  },[])// [] dependency array used to pass own value

  //fetch tasks from api
  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

    //Add Task
    const addTask = (task) =>{
      //need to generate id because we are not dealing with backend here
      const id = Math.floor(Math.random()*1000)+1
      //preparing new task to add
      const newTask = {id,...task} //...task will copy the remaining from parameter
      setTasks([...tasks,newTask])
    }

    //delete a task
    const deleteTask = (id) =>{
      //delete task
      setTasks(tasks.filter(
        (task)=>task.id !== id
      ))
    }

    //toggle reminder
    const togglerReminder =(id) =>{
      // 1st we change boolean value of the clicked task
      setTasks(
        tasks.map((task)=>task.id === id ? {
          ...task,reminder:!task.reminder
        }:task)
      )

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

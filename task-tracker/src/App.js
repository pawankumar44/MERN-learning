import Header from "./components/Header"; //importing custom header
import React from "react";
import Task from "./components/Tasks";
//to use state inside function we hook called useState
import { useState } from "react"

//by using function 
function App() {

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

      <Header title='Task Tracker'/>

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

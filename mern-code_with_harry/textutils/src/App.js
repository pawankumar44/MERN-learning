// import logo from './logo.svg';
import './App.css';
import Navebar from './components/Navebar';
import TextForm from './components/TextForm';
import React, {useState} from 'react';
import Alert from './components/Alert';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";


function App() {
  //we will try to control whole application state through app.js file
  const [mode, setMode] = useState('light');//whether dark mode enabled or not
  const [alert, setalert] = useState(null)

  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = '#081431' //to change color of the body
      showAlert("Dark mode has been enabled","success");
      document.title = 'TextUtils - Dark'
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'white' //to change color of the body
      showAlert("Light mode has been enabled", "success")
      document.title = 'TextUtils - Light'
    }
  }

  //function to show alert
  const showAlert = (message,type) => {
    setalert({
      message : message,
      type : type
    });
    setTimeout(() => {
      setalert(null);
    }, 3000);
  }

  return (

    <BrowserRouter>
    <Navebar title= "Textutils" aboutText = "About Text" mode={mode} toggleMode={toggleMode}></Navebar>
      <Routes>
        <Route exact path="/" element={
          <TextForm heading = "Enter The Text To Analyze " mode={mode}></TextForm>
        } />
        {/* exact path is used instead to path to do exact navigation */}
        <Route exact path="/about" element={
          <About></About>
        } />
      </Routes>
    </BrowserRouter>


    // <BrowserRouter>
    // <Navebar title= "Textutils" aboutText = "About Text" mode={mode} toggleMode={toggleMode}></Navebar>
    // <Alert alert={alert}></Alert>
    // <div className="container my-3"> 

    // <Routes>
    //       <Route path="/about">
    //         <About />
    //       </Route>
    //       <Route path="/">
    //       <TextForm heading = "Enter The Text To Analyze " mode={mode}></TextForm>
    //       </Route>
    //     </Routes>

      
    //   {/* <About></About> */}
    // </div>
    // </BrowserRouter>
  );
}

export default App;

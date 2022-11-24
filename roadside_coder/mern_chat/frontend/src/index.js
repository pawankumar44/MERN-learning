import React from 'react';
// import ReactDOM from 'react-dom/client'; <- This import is only for React version 18
import { render } from 'react-dom'; // <- This is the correct import // statement for React version 17
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import ChatProvider from './Context/ChatProvider';
import "bootstrap/dist/css/bootstrap.min.css";

// const root = //ReactDOM.createRoot(document.getElementById('root'));

const root = document.getElementById('root'); // <- This is the //correct method call for React version 17
render(

  <BrowserRouter>
  <ChakraProvider>  
    <ChatProvider>
      <App />
      </ChatProvider>
  </ChakraProvider>
  </BrowserRouter>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  BrowserRouter
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        {/* exact path is used instead to path to do exact navigation */}
        <Route exact path="/" element={
          <News key={"general"} pageSize={20} country="in" category="general"></News>
        } />
        <Route exact path="/business" element={
          <News key={"business"} pageSize={20} country="in" category="business"></News>
        } />
        <Route exact path="/entertainment" element={
          <News key={"entertainment"} pageSize={20} country="in" category="entertainment"></News>
        } />
        <Route exact path="/general" element={
          <News key={"general"} pageSize={20} country="in" category="general"></News>
        } />
        <Route exact path="/health" element={
          <News key={"health"} pageSize={20} country="in" category="health"></News>
        } />
        <Route exact path="/science" element={
          <News key={"science"} pageSize={20} country="in" category="science"></News>
        } />
        <Route exact path="/sports" element={
          <News key={"sports"} pageSize={20} country="in" category="sports"></News>
        } />
        <Route exact path="/technology" element={
          <News key={"technology"} pageSize={20} country="in" category="technology"></News>
        } />
      </Routes>
    </BrowserRouter>
      // <div>
      //   <Navbar></Navbar>
      //   <News pageSize={20} country="in" category="science"></News>
      // </div>
    )
  }
}


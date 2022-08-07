import { Button } from '@chakra-ui/react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import ChatProvider from './Context/ChatProvider';

function App() {
  return (
    <div className="App">
          <Routes>
      <Route exact path='/' element={
        <Homepage></Homepage> } />

      <Route exact path='/chats' element={
        <ChatPage></ChatPage>
      } />

      {/* <Route path='/chats'> */}
    </Routes>
    </div>
  );
}

export default App;

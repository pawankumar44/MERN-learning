import logo from './logo.svg';
import './App.css';
import { Login } from './components/Login';
import SignUp from './components/SignUp';
import Content from './components/Content';
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    // <Login></Login>
    // <SignUp></SignUp>
    // <Content></Content>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={
          <SignUp></SignUp>
        } />
        <Route path="login" element={
          <Login></Login>
        } />
        <Route path="content" element={
          <Content></Content>
        } />
      </Routes>
    </BrowserRouter>
  );
}
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);
export default App;

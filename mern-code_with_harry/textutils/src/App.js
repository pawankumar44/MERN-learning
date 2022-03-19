import logo from './logo.svg';
import './App.css';
import Navebar from './components/Navebar';
import TextForm from './components/TextForm';


function App() {
  return (
    <>
    <Navebar title= "Textutils" aboutText = "About Text"></Navebar>
    <div className="container my-3"> 
      <TextForm heading = "Enter The Text To Analyze "></TextForm>
    </div>
    </>
  );
}

export default App;

import './App.css';
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {incNum,decNum} from './actions/index'


function App() {
  const myState = useSelector((state) => state.changeNum)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <dir className="container">
        <h1>Increment/Decrement counter</h1>
        <h1>using React and Redux</h1>

        <div className="quantity">
          <a title='Decrement' className="quantity_minus" 
          onClick={()=>dispatch(decNum())}><span> - </span></a>
          <input type="text" readOnly className='quantity_input' name='quantity' value={myState} />
          <a title='Increment' className="quantity_plus"
           onClick={()=>dispatch(incNum(5))}><span> + </span></a>
        </div>
      </dir>
    </div>
  );
}

export default App;

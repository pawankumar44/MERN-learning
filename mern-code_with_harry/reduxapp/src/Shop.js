import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from './state'

const Shop = () => {
  const dispatch = useDispatch()
  return (
    <div>
        <h2>Deposit/Withdraw Money</h2>
        <button className="btn btn-primary mx-2"
        onClick={()=>{dispatch(actionCreators.withdrawMoney(100))}}>+</button>
        Update Balance
        <button className="btn btn-primary mx-2">-</button>
    </div>
  )
}

export default Shop
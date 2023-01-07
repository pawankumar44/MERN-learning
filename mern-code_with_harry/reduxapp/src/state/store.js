import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

//reducers, initial state {} which is empty and middleware
//redux thunk helps in implementing async function.
export const store = createStore(reducers,{},applyMiddleware(thunk))
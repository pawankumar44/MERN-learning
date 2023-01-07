import { combineReducers } from "redux";
import amountReducer from "./amountReducer";

const reducers = combineReducers({
    amout:amountReducer
})

export default reducers
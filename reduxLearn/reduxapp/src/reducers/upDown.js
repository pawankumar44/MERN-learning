const initialState = 0;

const changeNum = (state = initialState,action) =>{
    switch (action.type) {
        case "INC":
            return state + action.payload;
        case "DEC":
            return state - 1;
        
        default:
            return state;
    }
}

export default changeNum
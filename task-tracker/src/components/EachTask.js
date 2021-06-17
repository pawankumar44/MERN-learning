//to import icons from react
import { Color } from 'chalk'
import {FaTimes, faTimes} from 'react-icons/fa'

const EachTask = ({eachTask,onDelete}) => {
    
    return (
        <div className="task">
            <h3>{eachTask.text}
            <FaTimes
            onClick={()=>onDelete(eachTask.id)}
             style={{color:'red',cursor:'pointer'}}/>
            </h3>
            <p>{eachTask.day}</p>
        </div>
    )
}

export default EachTask

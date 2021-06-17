//to import icons from react
import {FaTimes} from 'react-icons/fa'


const EachTask = ({eachTask,onDelete,onToggle}) => {
    
    return (
        //change style as per reminder boolean value
        <div className={`task ${eachTask.reminder ? 'reminder':''}`}
         onDoubleClick={()=>onToggle(eachTask.id)}>
            <h3 >{eachTask.text}
            <FaTimes
            onClick={()=>onDelete(eachTask.id)}
             style={{color:'red',cursor:'pointer'}}/>
            </h3>
            <p>{eachTask.day}</p>
        </div>
    )
}

export default EachTask

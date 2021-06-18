import { useState } from "react";


export const AddTask = ({addTask}) => {

    //Each input have own piece of state
    //set state for every element of form
    const [text,setText] = useState('')
    const [day,setDate] = useState('')
    const [reminder,setReminder] = useState(false)

    return (
        <form className='add-from' onSubmit={(e)=>{
            e.preventDefault() //submit to a page
            if(!text){
                alert('Please Add a Task')
                return
            }

            //send variables to list
            addTask({text,day,reminder})
            //then clear the form
            setText('')
            setDate('')
            setReminder(false)
        }}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task'
                value={text} onChange={(e)=>setText(e.target.value)}></input>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time '
                value={day} onChange={(e)=>setDate(e.target.value)}></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                {/* for checkbox different method used to evoke state */}
                <input
                // unchecked if it is false
                checked={reminder}
                 type='checkbox' value={reminder}
                onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'></input>
        </form>
    )
}

export default AddTask;

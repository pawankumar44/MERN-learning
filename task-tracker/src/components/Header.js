// rafce can be used from es7 to create function shortcut
// import React from 'react' //we don't need now
import PropTypes from 'prop-types' //importing like data type
import Button from './Button'


//we need to show header as per condition
import { useLocation } from 'react-router-dom'


//creation of component
const Header = ({title,showAdd,changeAddButton }) => {
    const location = useLocation()
    return (

        //we will show this header as per loaction of file is home or not
        <header className='header'>

            {/* double curly brackets for inline css */}
            <h1>{title}</h1>

            {location.pathname === '/' && (
                <Button backgroundColor={changeAddButton ? 'red':'green'}
                onClick={showAdd}
                 text={changeAddButton ? 'Close':'Add'}
                />
            )}
            

        </header>
    )
}

// assiging prop type to title
Header.propTypes = {
    title: PropTypes.string,
}


//deafult probs in case nothing asigned to arguments
Header.defaultProps = {
    title: 'Default Header of props empty',
}

export default Header

// rafce can be used from es7 to create function shortcut
// import React from 'react' //we don't need now
import PropTypes from 'prop-types' //importing like data type
import Button from './Button'



//creation of component
const Header = ({title}) => {
    const onAddClick = ()=>{
        console.log('add')
    }
    return (
        <header className='header'>

            {/* double curly brackets for inline css */}
            <h1>{title}</h1>

            <Button backgroundColor='green'
            onClick={onAddClick}
             text='Add Now'
            />
            

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

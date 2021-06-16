
const Button = ({backgroundColor,text,onClick}) => {
    return<button
    onClick={onClick}
    style={{backgroundColor:backgroundColor}}
     className='btn'>{text}</button>
}

export default Button


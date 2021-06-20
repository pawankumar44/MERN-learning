import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            {/* <a href="/about">About</a> */}
            {/* use link to prevent reload circle while navigating to page */}
            <Link to='/about'>About</Link>
        </footer>
    )
}

export default Footer

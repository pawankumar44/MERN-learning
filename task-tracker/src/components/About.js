import { Link } from "react-router-dom"

const About = () => {
    return (
        <div>
            <h4>Its about page</h4>
            {/* <a href="/">Go Back</a> */}
            {/* use link to prevent reload circle while navigating to page */}
            <Link to='/'>Go Back</Link>
        </div>
    )
}

export default About

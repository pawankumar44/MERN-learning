import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
//invoke the navigator hook
const navigate = useNavigate();
    return (
        <>
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <br /><br />
            <label>
                E-mail: 
                <input type="text" name="Email"></input>
            </label>
            <br /><br />
            <label>
                Password:
                <input type="text" name = "password"></input>
            </label>
            <br /><br />
            <input type="submit" value="Submit" />
        </form>
        <br /><br /><br />
        <button type="button"
        onClick={() => navigate('../login')} name="alreadyLogged" value="">Already logged in</button>
        </>
    )
}

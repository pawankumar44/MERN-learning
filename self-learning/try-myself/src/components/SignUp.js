import React from 'react'

export default function SignUp() {

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
        <input type="submit" value="Login if already account"></input>
        </>
    )
}

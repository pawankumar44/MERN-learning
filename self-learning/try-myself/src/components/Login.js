import React,{Component} from 'react'
import {useNavigate} from 'react-router-dom'

export function Login() {
  const navigate = useNavigate();
    return (
      <>
      <form>
        <label>E-mail:&nbsp;
          <input type="email" />
        </label>
        <br />
        <br />
        <label>Password&nbsp;
            <input type="text" />
        </label>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
      <br />
      <button type="button"
        onClick={() => navigate('../signup')} name="alreadyLogged" value="">New here</button>
      </>
    )
  }

  
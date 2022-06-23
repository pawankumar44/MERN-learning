import React,{Component} from 'react'

export function Login() {
    return (
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
    )
  }

  
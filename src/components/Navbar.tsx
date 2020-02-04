import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar: React.FunctionComponent = () => {
    const [user, setUser]: any = useState('')
   
    useEffect(()=>{
        setUser(localStorage.getItem('login') || 'incognito')
    },[])
    return(
        <nav>
        <div className="nav-wrapper purple darken-2 px1">
        {user!=='Incognito' && <a href="/" className="brand-logo">
        {`Hello, ${user}`}
      </a>}
        {user==='Incognito' && <a href="/" className="brand-logo">
        {`Hello, Incognito`}
      </a>}
      <ul className="right hide-on-med-and-down">
        <li>
          <NavLink to="/">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/user/LogUp">Join Us</NavLink>
        </li>
      </ul>
    </div>
  </nav>
    )  
}
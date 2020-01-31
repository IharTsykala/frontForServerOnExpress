import React, { useState } from 'react'
import Service from '../services/service-user'
import { useHistory } from "react-router-dom"

export  const GetLoginPage: React.FC = () => {
    const history = useHistory()
    const[values, setValues] = useState<any>({})

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value        
        const name = event.target.name
        setValues(Object.assign(values, {[name]: value}))        
      }
    
    const logInHandler = (e: any) => {
        e.preventDefault()        
        Service.getTokenForLogin(values)
        history.push(`/users/all`)       
    }

    const logUnHandler = (e: any) => {
        e.preventDefault()  
        history.push(`/user/logUp`)       
    }

    return (
    <>
       
            <h1>Login</h1>
            <form>
            <label>
                Name:
            <input type="text" name="login" value={values.name} onChange={changeHandler}/>
            </label>
            <label>
                Password:
            <input type="text" name="password" value={values.password} onChange={changeHandler}/>
            </label>
            <input type="submit" value="log In" onClick={(e)=>logInHandler(e)}/>
            </form>
            <button onClick={(e)=>logUnHandler(e)}>Log Up</button>  
    </>
    )
}
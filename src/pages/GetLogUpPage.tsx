import React, { useState } from 'react'
import Service from '../services/service-user'
import { useHistory } from "react-router-dom"

export  const GetLogUpPage: React.FC = () => {
    const history = useHistory()
    const[values, setValues] = useState<any>({})

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target
        const value = target.value        
        const name = event.target.name
        setValues(Object.assign(values, {[name]: value}))        
      }
    
    const logUpHandler = (e: any) => {
        e.preventDefault()
        Service.getTokenForRegistration(values)
        history.push("/users/all")
        history.go(0)
    }

    return (
    <>
       
            <h1>Log Up</h1>
            <form>
            <label>
                Name:
            <input type="text" name="login" value={values.name} onChange={changeHandler}/>
            </label>
            <label>
                Password:
            <input type="text" name="password" value={values.password} onChange={changeHandler}/>
            </label>
            <input type="submit" value="Log Up" onClick={(e)=>logUpHandler(e)}/>
            </form>
              
    </>
    )
}
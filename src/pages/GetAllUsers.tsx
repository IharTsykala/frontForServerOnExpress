import React, { useEffect, useState } from "react"
import Service from '../services/service-user'
import { useHistory } from "react-router-dom"


export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState('loading')
  const history = useHistory()

  useEffect(() => {
    
    Service.getAllUsers(setUsers, setLoad) 

  },[])   
  
  if (load ==='loading'){    
    return (        
        <>         
        <h1>Ожидайте ответа</h1>
        </>  
      ) 
  } 
  if (load ==='loaded') {       
    return (            
        <ul>
        {users.map((user: any) => <li key={user._id}><p>{user.login}</p>
            <i 
              className="material-icons blue-text edit"
              onClick={event => Service.editHandler(event, user, history)}
            >edit                
            </i>
            <i
              className="material-icons red-text"
              onClick={event => {
                Service.removeHandler(setLoad, user._id,history)                
              }}
            >delete
            </i>
         </li>)}
         </ul>      
    ) 
  } 
  else {  
    return (      
        <>
            <h1>ошибка запроса</h1> 
        </>
    )
  }
}
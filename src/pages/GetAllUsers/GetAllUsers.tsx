import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import ServiceSubscriptions from "../../services/service-subscribe"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import { Context } from "../../Context"
import Search from '../../components/Search/Search'

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { userID, userRole } = useContext(Context)
  const [valueSearchBox, setValueSearchBox]: any = useState('')
  const [arrayLogInUserSubscribes, setArrayLogInUserSubscribes]: any = useState([])
  const [arrayLogInUserObservables, setArrayLogInUserObservables]: any = useState([])

  const render = useCallback(() => {
    try {
      getUsers()      
      getLogInUserSubscribes()
      // getLogInUserObservables()        
    } catch (e) {
      console.log(e)
    }
  }, [])


  useEffect(() => {
    render()
    
  }, [render])

  const render2 = useCallback(() => {
    try {
      
      getLogInUserObservables()        
    } catch (e) {
      console.log(e)
    }
  }, [])


  useEffect(() => {
    render2()
    
  }, [render2])

  async function getUsers() {
    const users = await Service.getAllUsers()
    setLoad("loaded")
    setUsers(users)
  }

  async function  getLogInUserSubscribes() {
    const arrayLogInUserSubscribes = await ServiceSubscriptions.getAllSubscribes(userID)    
    setArrayLogInUserSubscribes(arrayLogInUserSubscribes)
  }

  async function getLogInUserObservables() {
    console.log('arrayLogInUserObservables')   
    const arrayLogInUserObservables = await ServiceSubscriptions.getAllObservables(userID) 
      
    setArrayLogInUserObservables(arrayLogInUserObservables)
  }  

  const handlerInputSearchBox = (e:any) => {        
    setValueSearchBox(e.target.value)        
  }

  const getFlirtedArrayUsers = useCallback(async (valueSearchBox:any) => {
    try {
      if(valueSearchBox.length>2) {
        setTimeout(async()=>{           
          const arrayFilteredUsers = await Service.getFilteredUsers(valueSearchBox)          
          setUsers(arrayFilteredUsers)
        },1000)
      } else if(valueSearchBox.length<3 && valueSearchBox) {
        setTimeout(()=>{ 
        getUsers()
      },1000)
      }    
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(()=>{
    getFlirtedArrayUsers(valueSearchBox)
  },[getFlirtedArrayUsers, valueSearchBox])

  const removeHandler = async (e: any, id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    getUsers()
  }

  const handlerClickSubscribe = async(IdObserversUser:any) => {
    await ServiceSubscriptions.addSubscribe(userID, IdObserversUser)
    getLogInUserSubscribes()
    getLogInUserObservables()
  }

  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
        <div className={GetAllUsersCSS.container__all_users__header}>
          < Search handlerInputSearchBox={handlerInputSearchBox} valueSearchBox={valueSearchBox}/>
        <h2 >
            Make friends            
          </h2>
          
        </div> 
         
          <ul className={GetAllUsersCSS.container__all_users__cards}>
            {users.length>0 && users.map((user: any) => {
              return (
                user._id !== userID && (
                  <UserCard
                    key={user._id}
                    user={user}
                    removeHandler={removeHandler}
                    admin={userRole}
                    handlerClickSubscribe={handlerClickSubscribe}
                    idUserOwnerCard ={user._id}
                    arrayLogInUserSubscribes={arrayLogInUserSubscribes}
                    arrayLogInUserObservables={arrayLogInUserObservables}
                  />
                )
              )
            })}
          </ul>
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}
import React, { useEffect, useState, useContext, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import { Context } from "../../Context"
import Search from '../../components/Search/Search'

export const GetAllUsers: React.FC = () => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { userID, userRole } = useContext(Context)
  const [valueSearchBox, setValueSearchBox]: any = useState('')

  const render = useCallback(() => {
    try {
      getUsers()
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    render()    
  }, [render])

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

  async function getUsers() {
    const users = await Service.getAllUsers()
    setLoad("loaded")
    setUsers(users)
  }

  const removeHandler = async (e: any, id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    getUsers()
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
import React, { useEffect, useState } from "react"
import Service from "../../../services/service-user"
import UserCard from "../../../components/UserCard/UserCard"
import MainAllUsersBlockPageCSS from "./mainAllUsersBlock.module.css"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"

type MainAllUsersBlockProps = {
  user: User 
  allUsers: []
}

const MainAllUsersBlock: React.FunctionComponent<MainAllUsersBlockProps> = ({
  user,  
  allUsers
}) => {
  const [load, setLoad]: any = useState("loading")

  useEffect(() => {    
    try {      
      if(allUsers) {       
      setLoad("loaded")
      } else {
        // This need make notFound
      }
    } catch (e) {
      console.log(e)
    }
  }, [allUsers])  

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    // await getLogInUserAllSubscriptionsAndObserver()
  }

  const getLogInUserAllSubscriptionsAndObserver = () => {}

  return (
    <>
    {load === "loading" && <h1>Ожидайте ответа</h1>}
    {load === "loaded" && (
    <ul className={MainAllUsersBlockPageCSS.container__all_users__cards}>
      {allUsers &&
        allUsers.length > 0 &&
        allUsers.map((userOwnerCard: any) => {
          return (
            userOwnerCard._id !== user._id && (
              <UserCard
                key={userOwnerCard._id}
                userOwnerCard={userOwnerCard}
                removeHandler={removeHandler}
                getLogInUserAllSubscriptionsAndObserver={
                  getLogInUserAllSubscriptionsAndObserver
                }
              />
            )
          )
        })}
    </ul>)}
    {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  allUsers: state.allUsers.allUsers
})

export default connect(mapStateToProps)(MainAllUsersBlock)

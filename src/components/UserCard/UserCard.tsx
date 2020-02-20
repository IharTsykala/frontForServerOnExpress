import React, { useEffect, useState, useContext } from "react"
import UserCardCSS from "./UserCard.module.css"
import { useHistory } from "react-router-dom"
import ServiceSubscriptions from "../../services/service-subscribe"
import ServiceFriends from "../../services/service-friend"
import { Context } from "../../Context"

type UserCardProps = {
  user: any
  removeHandler: any
  admin: string 
  idUserOwnerCard: any
  arrayLogInUserSubscriptions: any
  // arrayLogInUserObservables: any
  // getLogInUserRequestSubscribes: any
  // getLogInUserResponseSubscribes: any
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  removeHandler,
  admin,  
  idUserOwnerCard,
  arrayLogInUserSubscriptions,
  // arrayLogInUserObservables
  // getLogInUserRequestSubscribes,
  // getLogInUserResponseSubscribes
}) => {
  const history = useHistory()
  const [isSubscribe, setIsSubscribe] = useState('')
  const [isObservable, setIsObservable] = useState('')
  const { userID } = useContext(Context)
  // console.log(arrayLogInUserSubscribes)
  // console.log(arrayLogInUserObservables) 

  const getSubscribeStatus = () => {     
    const isSubscribe = arrayLogInUserSubscriptions.find(
      (subscribe: any) => subscribe.responseSubscriberId === idUserOwnerCard
    )   
    setIsSubscribe(isSubscribe)    
    // console.log(isSubscribe) 
  // const isObservable = arrayLogInUserObservables.find(
  //     (observable: any) => observable.requestSubscriberId === idUserOwnerCard
  //   )    
    setIsObservable(isObservable)
    // console.log(isObservable)
  }
  
  useEffect(() => {
    getSubscribeStatus()    
  }, [arrayLogInUserSubscriptions.length])
  

  // const handlerClickSubscribeOrUnsubscribe = async(IdObserversUser:any) => {
  //   await ServiceSubscriptions.addSubscribe(userID, IdObserversUser)
  //   getLogInUserSubscribes()
  //   getLogInUserObservables()
  // }

  // const handlerClickAddFriendsOrRemove = async(IdObserversUser:any) => {
  //   await ServiceSubscriptions.addSubscribe(userID, IdObserversUser)
  //   getLogInUserSubscribes()
  //   getLogInUserObservables()
  // }

  const handlerClickSubscribe = async () =>{
    await ServiceSubscriptions.addSubscribe(userID, idUserOwnerCard)
    // getLogInUserRequestSubscribes()
    // getLogInUserResponseSubscribes()
  } 

  const handlerClickUnSubscribe = () =>{

  } 

  const handlerClickAddFriend = async() =>{
    await ServiceFriends.addFriend(userID, idUserOwnerCard)
  } 

  const handlerClickRemoveFriend = () =>{
    //  console.log(userID)
  } 

  const handlerClickSubscribeButton = () => {
    if(!isSubscribe&&!isObservable) handlerClickSubscribe()
    if(isSubscribe&&!isObservable) handlerClickUnSubscribe()
    if(!isSubscribe&&isObservable) handlerClickAddFriend()
    if(isSubscribe&&isObservable) handlerClickRemoveFriend()
  }



  return (
    <div className={UserCardCSS.container__all_users__card_user}>
      {admin === "admin" && (
        <i
          className={`material-icons ${UserCardCSS.container__all_users__card_user__delete}`}
          onClick={e => removeHandler(e, user._id)}
        >
          delete
        </i>
      )}
      {user.avatar ? (
        <img
          src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`}
          alt="avatar"
          onClick={() => {
            history.push(`/user/${user._id}`)
          }}
        />
      ) : (
        <img
          src="http://localhost:8080/images/pattern-avatar.jpg"
          alt="avatar"
          onClick={() => {
            history.push(`/user/${user._id}`)
          }}
        />
      )}
      <h5
        className={UserCardCSS.all_users__card_user__login}
        onClick={() => {
          history.push(`/user/${user._id}`)
        }}
      >
        {user.login}
      </h5>      
      <p className={UserCardCSS.all_users__card_user__friends}>
        {" "}
        It don't have friends
      </p>
      <p className={UserCardCSS.all_users__card_user__role}>{user.role}</p>
     <button
        className={`waves-effect waves-light btn ${UserCardCSS.all_users__card_user__button}`}
        onClick={() => handlerClickSubscribeButton()}        
      >
        {(!isSubscribe&&!isObservable)? (<p>Subscribe</p>)
        :(isSubscribe&&!isObservable)? (<p>UnSubscribe</p>)
        :(!isSubscribe&&isObservable)? (<p>Add friend</p>)
        :(isSubscribe&&isObservable)? (<p>Remove friend</p>)
        :null}       
      </button>    
    </div>
  )
}

export default UserCard

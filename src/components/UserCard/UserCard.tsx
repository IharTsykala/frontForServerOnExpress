import React from "react"
import UserCardCSS from './UserCard.module.css'

type UserCardProps = {
  user: any  
}

const UserCard: React.FC<UserCardProps>  = ({user}) => {
      
  return (    
        <div className={UserCardCSS.container__all_users__card_user}>
        {user.avatar? <img src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`} alt="avatar" />: <img src="http://localhost:8080/images/pattern-avatar.jpg" alt="avatar"/>}
        <h5 className={UserCardCSS.all_users__card_user__login} >{user.login}</h5>
        {/* {user.friends.length>0?<p>{user.friends.length}</p>:<p>'You dont have friends'</p>} */}
        <p className={UserCardCSS.all_users__card_user__friends}  > It don't have friends</p>
        <p className={UserCardCSS.all_users__card_user__role} >{user.role }</p>      
    </div>
  )
}

export default UserCard

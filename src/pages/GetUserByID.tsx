import React, { useEffect, useState } from "react"
import Service from "../services/service-user"
import { useHistory } from "react-router-dom"
import FormDataUsers from "../components/FormDataUsers"
import { UserFormViewModes, UserFormViewButtons } from "../shared/constants/user-from-view-mode.enum"
import ListPets from "../components/ListPets"

export const GetUserByID: React.FC = (props: any) => {
  const [user, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const { id } = props.match.params
  const history = useHistory()
  const [avatarForFront, setAvatarForFront]: any = useState("")
  const [avatarForBack, setAvatarForBack]: any = useState("")  

  useEffect(() => {
    ;(async () => {
      try {
        const user = await Service.getUserByID(id)
        setUsers(user || {})
        setLoad("loaded")
      } catch (e) {
        console.log(e)
      }
    })()
  }, [id])

  const editSubmitHandler = async (id: number, user: any) => {   
    await Service.editUser(id, user)
    history.push(`/users/all`)
  }

  const exitHandler = () => {
    history.push(`/users/all`)
  }

  const handleChangeAvatar = (e: any) => {
    const target = e.target.files[0]
    if (target) {
      setAvatarForFront(URL.createObjectURL(target))
      setAvatarForBack(target)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const img = await Service.setImgUser(avatarForBack)      
    await Service.editUser(id, { avatar: img, password:'' })
  }

  return (
    <>
      <i className="material-icons red-text" onClick={event => exitHandler()}>
        {" "}
        close
      </i>
      <form action="submit">
       {avatarForFront && <img className = 'chelik' src={`${avatarForFront}`} alt="avatar" />} 
       {!avatarForFront && user._id && user.avatar && <img className = 'chelik' src={`http://localhost:8080/images/users/${user._id}/${user.avatar}`} alt="avatar" />} 
       {!avatarForFront && user._id && !user.avatar && <img className = 'chelik' src={`http://localhost:8080/images/users/pattern-avatar.jpg`} alt="avatar" />}       
        <input type="file" onChange={e => handleChangeAvatar(e)} />
        <input type="submit" value="Отправить" onClick={e => handleSubmit(e)} />
      </form>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
        <FormDataUsers
          user={user}
          submitHandler={editSubmitHandler}
          namePage={UserFormViewModes.Edit}
          nameButton={UserFormViewButtons.Edit}
        />
        <ListPets id={id}/>
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

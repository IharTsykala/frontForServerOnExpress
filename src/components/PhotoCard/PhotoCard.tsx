import React from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import PhotoCardCSS from "./PhotoCard.module.css"

type UserPhotoCard = {
  name?: any
  description?: any
  id?: any
  removeHandler?: any
  editHandler?: any
  url: any
  idUser: any
}

const PhotoCard: React.FC<UserPhotoCard> = ({
  name,
  description,
  id,
  removeHandler,
  editHandler,
  url,
  idUser
}) => {
  // useEffect(()=>{console.log(name)},[])

  return (
    <>
      <Card className={PhotoCardCSS.photoAlbum__photoCard}>
        <CardMedia
          image={`http://localhost:8080/images/users/${idUser}/${url}`}
          title="Image title"
          className={PhotoCardCSS.photoAlbum__photoCard_photo}
        />
        <CardActions>          
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* <p>{name}</p>
            <p>{description}</p>
            <i  className="material-icons" onClick={()=>editHandler(id)} > edit </i> */}
      {/* <i className="material-icons" onClick={() => removeHandler(id)}>
        {" "}
        delete{" "}
      </i>
      <img
        className={PhotoCardCSS.user_profile__card_container__img}
        src={`http://localhost:8080/images/users/${idUser}/${url}`}
        alt="photo"
      /> */}
    </>
  )
}

export default PhotoCard

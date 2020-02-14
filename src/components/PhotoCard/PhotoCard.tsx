import React from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import PhotoCardCSS from "./PhotoCard.module.css"
import { Link } from "react-router-dom"

type UserPhotoCard = {
  name?: any
  description?: any
  urlItem: any
  idItem: any
  removeHandler: any
  editHandler: any  
  idUserOwnerPage?: any
  idChosenAlbum?: any  
}

const PhotoCard: React.FC<UserPhotoCard> = ({
  name,
  description,
  urlItem,
  idItem,
  removeHandler,
  editHandler,  
  idUserOwnerPage,
  idChosenAlbum   
}) => { 

  console.log(idUserOwnerPage || idChosenAlbum)

  return (
    <>
      <Card className={PhotoCardCSS.photoAlbum__photoCard}>
        <Link to={(idUserOwnerPage && `/album/${idItem}`) || (idChosenAlbum && `/album/${idItem}`)}>
        <CardMedia
          image={`http://localhost:8080/images/users/${idUserOwnerPage}/${urlItem}`}
          title="Image title"
          className={PhotoCardCSS.photoAlbum__photoCard_photo}          
        />
        </Link>
        <CardActions>
          <Button size="small" color="primary" onClick={() => editHandler(idItem)}>
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => removeHandler(idItem)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default PhotoCard

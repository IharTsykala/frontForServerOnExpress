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
  launchTogglePhotoModalWindow: any
}

const PhotoCard: React.FC<UserPhotoCard> = ({
  name,
  description,
  // idItem may be idCreateAlbum or idCreatePhoto
  urlItem,
  idItem,
  removeHandler,
  editHandler,
  idUserOwnerPage,
  idChosenAlbum,
  launchTogglePhotoModalWindow
}) => {
  return (
    <>
      <Card className={PhotoCardCSS.photoAlbum__photoCard}>
        {!idChosenAlbum && (
          <Link to={`${idItem}/album`}>
            <CardMedia
              image={`http://localhost:8080/images/users/${idUserOwnerPage}/${urlItem}`}
              title="Image title"
              className={PhotoCardCSS.photoAlbum__photoCard_photo}
            />
          </Link>
        )}
        {idChosenAlbum && (
          <CardMedia
            image={`http://localhost:8080/images/users/${idUserOwnerPage}/${urlItem}`}
            title={urlItem}
            className={PhotoCardCSS.photoAlbum__photoCard_photo}
            onClick={e => launchTogglePhotoModalWindow(e)}
          />
        )}

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => editHandler(idItem)}
          >
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

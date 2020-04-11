import React from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardMedia from "@material-ui/core/CardMedia"
import PhotoCardCSS from "./PhotoCard.module.css"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"

type UserPhotoCard = {
  userOwnerThisPage: UserOwnerThisPageInterface
  urlItem: any
  idItem: any
  removeHandler: any
  editHandler: any
  idChosenAlbum?: any
  launchTogglePhotoModalWindow: any
  ownerUser: any
}

const PhotoCard: React.FC<UserPhotoCard> = ({
  // idItem may be idCreateAlbum or idCreatePhoto
  userOwnerThisPage,
  urlItem,
  idItem,
  removeHandler,
  editHandler,
  idChosenAlbum,
  launchTogglePhotoModalWindow,
  ownerUser
}) => {
  return (
    <Card className={PhotoCardCSS.photoAlbum__photoCard_block__card}>
      {!idChosenAlbum && (
        <Link to={`/user/${idItem}/album`}>
          <CardMedia
            image={`http://localhost:8080/images/users/${ownerUser}/${urlItem}`}
            title="Image title"
            className={PhotoCardCSS.photoAlbum__photoCard_block__card__photo}
          />
        </Link>
      )}
      {idChosenAlbum && (
        <CardMedia
          image={`http://localhost:8080/images/users/${ownerUser}/${urlItem}`}
          title={urlItem}
          className={PhotoCardCSS.photoAlbum__photoCard_block__card__photo}
          onClick={e => launchTogglePhotoModalWindow(e)}
        />
      )}

      <CardActions
        className={PhotoCardCSS.photoAlbum__photoCard_block__card__actions}
      >
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
  )
}

const mapStateToProps = (state: any) => ({
  userOwnerThisPage: state.user.userOwnerThisPage
})

export default connect(mapStateToProps)(PhotoCard)

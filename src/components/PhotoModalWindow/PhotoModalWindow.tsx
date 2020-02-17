import React from "react"
import PhotoModalWindowCSS from "./PhotoModalWindow.module.css"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

type PhotoModalWindowProps = {
  arrayPhotosChosenAlbum: any
  launchTogglePhotoModalWindow: any
  idUserOwnerPage: string
  currentUrlPhotoForLoop: string
}

const PhotoModalWindow: React.FC<PhotoModalWindowProps> = ({
  arrayPhotosChosenAlbum,
  launchTogglePhotoModalWindow,
  idUserOwnerPage,
  currentUrlPhotoForLoop
}) => {
  const currentIndex = arrayPhotosChosenAlbum.findIndex(
    (photo: any) => photo.url === currentUrlPhotoForLoop
  )

  const handleOnDragStart = (e: any) => e.preventDefault()

  return (
    <div className={PhotoModalWindowCSS.user_profile__chosen_album__photo_loop}>
      <p onClick={() => launchTogglePhotoModalWindow()}>
        BACK TO PHOTO LIST IN THIS ALBUM
      </p>

      <div>
        <AliceCarousel mouseTrackingEnabled>
          {arrayPhotosChosenAlbum.length > 0 &&
            arrayPhotosChosenAlbum.map((item: any) => (
              <img                
                onDragStart={handleOnDragStart}
                key={item._id}
                src={`http://localhost:8080/images/users/${item.ownerUser}/${item.url}`}
                className={
                  PhotoModalWindowCSS.user_profile__chosen_album__photo_loop__img
                }
                alt="title"
              />
            ))}
        </AliceCarousel>
      </div>
      {/* <img
        src={`http://localhost:8080/images/users/${idUserOwnerPage}/${currentUrlPhotoForLoop}`}
        alt="Photo Title"
      /> */}
    </div>
  )
}

export default PhotoModalWindow

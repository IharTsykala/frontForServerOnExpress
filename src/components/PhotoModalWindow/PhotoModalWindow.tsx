import React from "react"
import PhotoModalWindowCSS from "./PhotoModalWindow.module.css"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

type PhotoModalWindowProps = {
  arrayPhotosChosenAlbum: any
  launchTogglePhotoModalWindow: any
  currentUrlPhotoForLoop: string
}

const PhotoModalWindow: React.FC<PhotoModalWindowProps> = ({
  arrayPhotosChosenAlbum,
  launchTogglePhotoModalWindow,
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
        <AliceCarousel startIndex={currentIndex} mouseTrackingEnabled>
          {arrayPhotosChosenAlbum.length &&
            arrayPhotosChosenAlbum.map((item: any) => (
              <img
                onDragStart={handleOnDragStart}
                key={item._id}
                src={`https://strawberry-tart-41911.herokuapp.com/images/users/${item.ownerUser}/${item.url}`}
                className={
                  PhotoModalWindowCSS.user_profile__chosen_album__photo_loop__img
                }
                alt="title"
              />
            ))}
        </AliceCarousel>
      </div>
    </div>
  )
}

export default PhotoModalWindow

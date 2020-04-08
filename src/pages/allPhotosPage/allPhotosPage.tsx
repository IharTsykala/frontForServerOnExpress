import React, { useEffect, useCallback } from "react"
import AllPhotosPageCSS from "./allPhotosPage.module.css"
// import CreateList from "../../components/CreateList/CreateList"
import { Link } from "react-router-dom"
// import PhotoModalWindow from "../../components/PhotoModalWindow/PhotoModalWindow"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { UserOwnerThisPageInterface } from "../../Redux/interfaces/userOwnerThisPage.interface"
import { Photo } from "../../Redux/interfaces/photo.interface"
import { getListPhotosByUserIdIdAction } from "../../Redux/store/albums/albums.action"
// import { addPhotosInCurrentAlbumAction } from "../../Redux/store/albums/albums.action"
// import { removePhotoFromCurrentAlbumAction } from "../../Redux/store/albums/albums.action"

type AllPhotosPageProps = {
  user: User  
  userOwnerThisPage: UserOwnerThisPageInterface
  currentAlbum: [Photo]
  allPhotosForThisUser: [Photo]
  loadingState: string
  match: any
  dispatch: any
}

const AllPhotosPage: React.FC<AllPhotosPageProps> = ({
  user,
  userOwnerThisPage,
  currentAlbum,
  loadingState,
  allPhotosForThisUser,
  match,
  dispatch
}) => {
  const thisUserId = match.params.id
  console.log(allPhotosForThisUser)

  const getList = useCallback(async () => {
    dispatch(getListPhotosByUserIdIdAction(thisUserId))
  }, [dispatch, thisUserId])

  useEffect(() => {
    getList()
  }, [getList])

  return (
    <div className={AllPhotosPageCSS.AllPhotoPage__container}>
      <Link to={`/user/profile/${userOwnerThisPage._id}`}>
        <p>BACK TO ALBUM LIST</p>
      </Link>
      {/* <CreateList
              arr={currentAlbum}
              removeHandler={removeHandler}
              editHandler={editHandler}
              idChosenAlbum={idChosenAlbum}
              createListFunction={"CreateListPhotos"}
              launchTogglePhotoModalWindow={launchTogglePhotoModalWindow}
            /> */}
      <ul className={AllPhotosPageCSS.user_profile__photos_list__container}>
        {allPhotosForThisUser.length > 0 &&
          allPhotosForThisUser.map((item: any) => (
            <li
              className={AllPhotosPageCSS.user_profile__photo_container}
              key={item._id || 1}
            >
              <img
                src={`http://localhost:8080/images/users/${thisUserId}/${item.url}`}
                alt="userPhoto"
              />
            </li>
          ))}
        {!allPhotosForThisUser.length && <p>Your list photos is empty</p>}
      </ul>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  userOwnerThisPage: state.userOwnerThisPageForSagas.userOwnerThisPage,
  currentAlbum: state.albumsState.currentAlbum,
  loadingState: state.loadingState.loadingStatePhotosInCurrentAlbum,
  allPhotosForThisUser: state.albumsState.allPhotosForThisUser
})

export default connect(mapStateToProps)(AllPhotosPage)

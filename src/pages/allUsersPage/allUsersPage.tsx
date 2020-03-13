import React from "react"
import HeaderAllUsersBlock from "./headerAllUsersBlock/headerAllUsersBlock"
import MainAllUsersBlock from "./mainAllUsersBlock/mainAllUsersBlock"
import PaginationBlock from "../../components/PaginationBlock/PaginationBlock"
import allUsersPageCSS from "./allUsersPage.module.css"

const AllUsersPage: React.FunctionComponent = () => {
  return (
    <div className={allUsersPageCSS.container__all_users}>
      <HeaderAllUsersBlock />
      <MainAllUsersBlock />
      <PaginationBlock/> 
    </div>
  )
}

export default AllUsersPage

// this need carry out in sagas// this need carry out in sagas// this need carry out in sagas
// this need carry out in sagas// this need carry out in sagas// this need carry out in sagas

// async function getLogInUserAllSubscriptionsAndObserver() {
//   if (user._id) {
//     const arrayLogInUsersAllSubscriptionsAndObserver = await Service.getUserWithSubscriptionsById(
//       user._id
//     )
//     // setLoad("loaded")
//     dispatch(AllUsersAction(arrayLogInUsersAllSubscriptionsAndObserver))
//     // setUsers(arrayLogInUsersAllSubscriptionsAndObserver)
//   }
// }

// this need carry out in sagas

// const getUserAfterPaginationAndSearchAndFilter = async (
//   numberPage: Number,
//   limitRender: Number,
//   checkbox?: Boolean
// ) => {
//   if (limitRender) {
//     let body = {
//       idLogInUser: user._id,
//       valueSearchBox: "",
//       numberPage,
//       checked: checkbox || checked,
//       limitRender
//     }
//     if (valueSearchBox.length > 2) {
//       body = Object.assign({}, body, {
//         valueSearchBox
//       })
//     }

//     const listUsers = await Service.getUserAfterPaginationAndSearchAndFilter(
//       body
//     )
//     console.log(listUsers)
//     setUsers(listUsers)
//     return listUsers
//   } else {
//     setUsers(allUsers)
//     setPrevChecked(true)
//     setChecked(false)
//     dispatch(
//       setValuesForPaginationAction({
//         numberPage: 1,
//         limitUsersForRender: limitRender
//       })
//     )
//   }
// }

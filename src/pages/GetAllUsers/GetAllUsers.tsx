import React, { useEffect, useState, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import Search from "../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
// import ServiceFriends from "../../services/service-friend"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { AllUsersAction } from "../../Redux/store/allUsers/allUsers.actions"
import PaginationBlock from "../../components/PaginationBlock/PaginationBlock"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"
// import { setInitialValueForPaginationAction } from "../../Redux/store/pagination/pagination.actions"
// import { Pagination } from "../../Redux/interfaces/pagination.interface"

type GetAllUsersProps = {
  user: User
  dispatch: any
  // pagination: Pagination
  allUsers: []
}

const GetAllUsers: React.FunctionComponent<GetAllUsersProps> = ({
  user,
  dispatch,
  // pagination,
  allUsers
}) => {
  const [users, setUsers]: any = useState([])
  const [load, setLoad]: any = useState("loading")
  const [valueSearchBox, setValueSearchBox]: any = useState("")  
  const [checked, setChecked]: any = useState(false)
  // on some time
  const [prevChecked, setPrevChecked]: any = useState(false)

  const render = useCallback(async () => {
    try {
      await getLogInUserAllSubscriptionsAndObserver()
    } catch (e) {
      console.log(e)
    }
  }, [user])

  useEffect(() => {
    render()
  }, [render])

  async function getLogInUserAllSubscriptionsAndObserver() {
    if (user._id) {
      const arrayLogInUsersAllSubscriptionsAndObserver = await Service.getUserWithSubscriptionsById(
        user._id
      )
      setLoad("loaded")
      dispatch(AllUsersAction(arrayLogInUsersAllSubscriptionsAndObserver))
      setUsers(arrayLogInUsersAllSubscriptionsAndObserver)
    }
  }

  const handlerInputSearchBox = (e: any) => {    
    setValueSearchBox(e.target.value)
  }

  const getUserAfterPaginationAndSearchAndFilter = async (
    numberPage: Number,
    limitRender: Number,
    checkbox?: Boolean
  ) => {    
    if (limitRender) {
      let body = {
        idLogInUser: user._id,
        valueSearchBox: "",
        numberPage,
        checked: checkbox || checked,
        limitRender
      }      
      if (valueSearchBox.length > 2) {
        body = Object.assign({}, body, {
          valueSearchBox
        })
      }      
      const listUsers = await Service.getUserAfterPaginationAndSearchAndFilter(
        body
      )
      console.log(listUsers)
      setUsers(listUsers)
      return   listUsers    
    } else {
      setUsers(allUsers)
      setPrevChecked(true)
      setChecked(false)
      dispatch(
        setValuesForPaginationAction({
          numberPage: 1,
          limitUsersForRender: limitRender
        })
      )
    }
  }

  const handleClickFriendCheckBox = async () => {    
    setPrevChecked(checked)
    setChecked(!checked)
  }

  const getFilteredArrayUsers = useCallback(async (valueSearchBox: any) => {
    try {      
      if (valueSearchBox.length === 2) {
        await getLogInUserAllSubscriptionsAndObserver()  
      } 
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    getFilteredArrayUsers(valueSearchBox)   
  }, [getFilteredArrayUsers, valueSearchBox])

  const removeHandler = async (id: number) => {
    setLoad("loading")
    await Service.removeHandler(id)
    await getLogInUserAllSubscriptionsAndObserver()
  }

  return (
    <>
      {load === "loading" && <h1>Ожидайте ответа</h1>}
      {load === "loaded" && (
        <>
          <div className={GetAllUsersCSS.container__all_users__header}>
            <Search
              handlerInputSearchBox={handlerInputSearchBox}
              valueSearchBox={valueSearchBox}
            />
            <h2>Make friends</h2>
            <Checkbox
              checked={checked}
              onClick={() => handleClickFriendCheckBox()}
              className={
                GetAllUsersCSS.container__all_users__header__sort_checkbox
              }
            />
          </div>

          <ul className={GetAllUsersCSS.container__all_users__cards}>
            {users.length > 0 &&
              users.map((userOwnerCard: any) => {
                return (
                  userOwnerCard._id !== user._id && (
                    <UserCard
                      key={userOwnerCard._id}
                      userOwnerCard={userOwnerCard}
                      removeHandler={removeHandler}
                      getLogInUserAllSubscriptionsAndObserver={
                        getLogInUserAllSubscriptionsAndObserver
                      }
                    />
                  )
                )
              })}
          </ul>
          <PaginationBlock
            checked={checked}
            valueSearchBox={valueSearchBox}
            getUserAfterPaginationAndSearchAndFilter={
              getUserAfterPaginationAndSearchAndFilter
            }
            prevChecked={prevChecked}
          />
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  // pagination: state.pagination.pagination,
  allUsers: state.allUsers.allUsers
})

export default connect(mapStateToProps)(GetAllUsers)


// const getFlirtedArrayUsers = useCallback(async (valueSearchBox: any) => {
  //   try {
  //     if (valueSearchBox.length > 2) {
  //       const clearInterval = setTimeout(async () => {
  //         const arrayFilteredUsers = await Service.getFilteredUsers(
  //           valueSearchBox
  //         )
  //         setUsers(arrayFilteredUsers)
  //       }, 1000)
  //       setTimerId(clearInterval)
  //     } else if (valueSearchBox.length === 2)
  //       await getLogInUserAllSubscriptionsAndObserver()
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }, [])

  // if (!checked && pagination.limitUsersForRender) {
    //   const arrayFriendsByIdUser = getUserAfterPaginationAndSearchAndFilter(
    //     pagination.numberPage,
    //     pagination.limitUsersForRender,
    //     !checked
    //   )
    //   setUsers(arrayFriendsByIdUser)
    // } else
    // console.log(checked)

    //  if (!checked && !pagination.limitUsersForRender) {
    //   let arrayFriendsByIdUser = await ServiceFriends.getArrayFriendsByIdUser(
    //     user._id
    //   )
    //   setUsers(arrayFriendsByIdUser)
    // } 
import React, { useEffect, useState, useCallback } from "react"
import Service from "../../services/service-user"
import UserCard from "../../components/UserCard/UserCard"
import GetAllUsersCSS from "./GetAllUsers.module.css"
import Search from "../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { AllUsersAction } from "../../Redux/store/allUsers/allUsers.actions"
import PaginationBlock from "../../components/PaginationBlock/PaginationBlock"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"

type GetAllUsersProps = {
  user: User
  dispatch: any
  allUsers: []
}

const GetAllUsers: React.FunctionComponent<GetAllUsersProps> = ({
  user,
  dispatch,
  allUsers
}) => {
  const [users, setUsers] = useState([])
  const [load, setLoad] = useState("loading")
  const [valueSearchBox, setValueSearchBox] = useState("")
  const [checked, setChecked]: any = useState(false)
  // on some time
  const [prevChecked, setPrevChecked] = useState(false)

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
      return listUsers
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

  const removeHandler = async (id: string) => {
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
            // handlerInputSearchBox={handlerInputSearchBox}
            // valueSearchBox={valueSearchBox}
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
            {allUsers &&
              allUsers.length > 0 &&
              users.map((userOwnerCard: any) => {
                return (
                  userOwnerCard._id !== user._id && (
                    <UserCard
                      key={userOwnerCard._id}
                      userOwnerCard={userOwnerCard}
                      // removeHandler={removeHandler}
                      getLogInUserAllSubscriptionsAndObserver={
                        getLogInUserAllSubscriptionsAndObserver
                      }
                    />
                  )
                )
              })}
          </ul>
          <PaginationBlock
          // checked={checked}
          // valueSearchBox={valueSearchBox}
          // getUserAfterPaginationAndSearchAndFilter={
          //   getUserAfterPaginationAndSearchAndFilter
          // }
          // prevChecked={prevChecked}
          />
        </>
      )}
      {load !== "loading" && load !== "loaded" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  allUsers: state.allUsers.allUsers
})

export default connect(mapStateToProps)(GetAllUsers)

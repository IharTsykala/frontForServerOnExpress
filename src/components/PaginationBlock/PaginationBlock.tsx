import React, { useEffect, useState, useCallback } from "react"
import PaginationBlockCSS from "./PaginationBlock.module.css"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { Pagination } from "../../Redux/interfaces/pagination.interface"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"
import Button from "@material-ui/core/Button"
import { getAllUsersForSagasAction } from "../../Redux/store/allUsers/allUsers.actions"
import { AllUsersAction } from "../../Redux/store/allUsers/allUsers.actions"
import { getAllUsersWithPaginationSearchFilterAction } from "../../Redux/store/allUsersWithPaginationSearchFilter/allUsersWithPaginationSearchFilter.actions"

type PaginationBlockProps = {
  user: User
  allUsers: [User]
  pagination: Pagination
  dispatch: any
  checked: Boolean
  prevChecked: Boolean
  valueSearchBox: String | ""
  // getUserAfterPaginationAndSearchAndFilter: any
}

const PaginationBlock: React.FunctionComponent<PaginationBlockProps> = ({
  user,
  allUsers,
  pagination,
  dispatch,
  checked,
  prevChecked,
  valueSearchBox
  // getUserAfterPaginationAndSearchAndFilter,
}) => {
  const limitRender = pagination.limitUsersForRender
  const { numberPage } = pagination
  const [timerId, setTimerId]: any = useState(undefined)
  const [prevCountUsers, setPrevCountUsers]: any = useState(undefined)
  const [users, setUsers]: any = useState(undefined)

  const firstRender = useCallback(async () => {
    try {
      if (user._id) dispatch(getAllUsersForSagasAction(user._id))
      else dispatch(getAllUsersForSagasAction(""))
      setPrevCountUsers(allUsers.length)
    } catch (e) {
      console.log(e)
    }
  }, [user._id, dispatch])

  useEffect(() => {
    firstRender()
  }, [firstRender, user])

  const getUsersAfterPaginationAndSearchAndFilter = async (
    numberPage: Number,
    limitRender: Number
  ) => {
    const body = {
      idLogInUser: user._id,
      valueSearchBox,
      numberPage,
      checked,
      limitRender
    }
    if (limitRender) {
      // if (valueSearchBox.length > 2) {
      //   body = Object.assign({}, body, {
      //     valueSearchBox
      //   })
      // }
      // const listUsers = await Service.getUserAfterPaginationAndSearchAndFilter(
      //   body
      // )
      console.log(body)
      dispatch(getAllUsersWithPaginationSearchFilterAction(body))
      // setUsers(listUsers)
      // return listUsers
    } else {
      firstRender()
      // setPrevChecked(true)
      // setChecked(false)
      dispatch(
        setValuesForPaginationAction({
          numberPage: 1,
          limitUsersForRender: limitRender
        })
      )
    }
  }

  useEffect(() => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: 1,
        limitUsersForRender: limitRender
      })
    )
    // call function after click checkbox or search. refund value
    if (numberPage !== 1 || prevChecked || valueSearchBox || checked) {
      clearTimeout(timerId)
      const clearInterval = setTimeout(async () => {
        const users = await getUsersAfterPaginationAndSearchAndFilter(
          1,
          limitRender
        )
        setUsers(users)
      }, 500)
      // setPrevCountUsers(undefined)
      setTimerId(clearInterval)
    }
  }, [checked, valueSearchBox])

  const handleChangeSelect = async (newLimitRender: any) => {
    dispatch(
      setValuesForPaginationAction({
        numberPage:
          Math.ceil((+numberPage * +limitRender) / +newLimitRender) || 1,
        limitUsersForRender: +newLimitRender
      })
    )
    // let users =
     await getUsersAfterPaginationAndSearchAndFilter(
      Math.ceil((+numberPage * +limitRender) / +newLimitRender) || 1,
      +newLimitRender
    )
    
    // let page
    // if (
    //   allUsers &&
    //   allUsers[0] &&
    //   allUsers[0].countUsers !== undefined &&
    //   (+numberPage * +limitRender) / +newLimitRender > allUsers[0].countUsers
    // ) {
    //   page = Math.ceil(+allUsers[0].countUsers / +newLimitRender)
    // } else {
    //   page = Math.ceil(+numberPage * +limitRender) / +newLimitRender
    // }
    
    
    // dispatch(
    //   setValuesForPaginationAction({
    //     numberPage:
    //       Math.ceil((+numberPage * +limitRender) / +newLimitRender) || 1,
    //     limitUsersForRender: +newLimitRender
    //   })
    // )
    // // let users =
    //  await getUsersAfterPaginationAndSearchAndFilter(
    //   Math.ceil((+numberPage * +limitRender) / +newLimitRender) || 1,
    //   +newLimitRender
    // )
    // if (!prevCountUsers) setPrevCountUsers(allUsers.length)

    // console.log(limitRender)
    // console.log(newLimitRender)
    // dispatch(
    //   setValuesForPaginationAction({
    //     numberPage: Math.ceil(prevCountUsers / +newLimitRender) || 1,
    //     limitUsersForRender: +newLimitRender
    //   })
    // )
    // await getUsersAfterPaginationAndSearchAndFilter(
    //   Math.ceil(prevCountUsers / +newLimitRender) || 1,
    //   +newLimitRender
    // )
    // setPrevCountUsers(allUsers[0].countUsers)
    // setUsers(users)
    // if (users && users[0] && users[0].countUsers !== undefined)
    //   setPrevCountUsers(users[0].countUsers)
    // else {
    //   if (prevCountUsers) {
    //     dispatch(
    //       setValuesForPaginationAction({
    //         numberPage: Math.ceil(prevCountUsers / +newLimitRender) || 1,
    //         limitUsersForRender: +newLimitRender
    //       })
    //     )
    //     users = await getUserAfterPaginationAndSearchAndFilter(
    //       Math.ceil(prevCountUsers / +newLimitRender) || 1,
    //       +newLimitRender
    //     )
    //     setUsers(users)
    //   }
    // }
  }

  const handlerClickPrevPage = async () => {
    if (numberPage > 1) {
      dispatch(
        setValuesForPaginationAction({
          numberPage: +numberPage - 1,
          limitUsersForRender: limitRender
        })
      )
      const users = await getUsersAfterPaginationAndSearchAndFilter(
        +numberPage - 1,
        limitRender
      )
      setUsers(users)
    }
  }

  const handlerClickNextPage = async () => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: +numberPage + 1,
        limitUsersForRender: limitRender
      })
    )
    const users = await getUsersAfterPaginationAndSearchAndFilter(
      +numberPage + 1,
      limitRender
    )
    setUsers(users)
  }

  return (
    <section className={PaginationBlockCSS.All_Users__Pagination_Block}>
      <div
        className={PaginationBlockCSS.All_Users__Pagination_Block__Select_block}
      >
        <InputLabel htmlFor="outlined-age-native-simple">
          Amount of Users
        </InputLabel>
        <Select
          native
          onChange={e => handleChangeSelect(e.target.value)}
          labelWidth={40}
          inputProps={{
            name: "age",
            id: "outlined-age-native-simple"
          }}
        >
          <option value={0}>{"all users"}</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </div>
      <div
        className={PaginationBlockCSS.All_Users__Pagination_Block__Button_block}
      >
        {numberPage > 1 && (
          <Button
            variant="outlined"
            component="span"
            onClick={() => handlerClickPrevPage()}
          >
            Prev
          </Button>
        )}
        <div>{numberPage}</div>
        {allUsers &&
          allUsers[0] &&
          allUsers[0].countPage !== undefined &&
          allUsers[0].countPage > numberPage && (
            <Button
              variant="outlined"
              component="span"
              onClick={() => handlerClickNextPage()}
            >
              Next
            </Button>
          )}
      </div>
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  allUsers: state.allUsers.allUsers,
  pagination: state.pagination.pagination,
  checked: state.checkBoxState.checkBoxState,
  prevChecked: state.checkBoxState.prevChecked,
  valueSearchBox: state.searchStringState.searchStringState
})

export default connect(mapStateToProps)(PaginationBlock)

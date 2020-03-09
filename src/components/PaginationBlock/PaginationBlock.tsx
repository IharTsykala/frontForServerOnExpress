import React, { useEffect, useState } from "react"
import PaginationBlockCSS from "./PaginationBlock.module.css"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import { connect } from "react-redux"
import { Pagination } from "../../Redux/interfaces/pagination.interface"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"

type PaginationBlockProps = {
  pagination: Pagination
  dispatch: any
  checked: Boolean
  valueSearchBox: String | ""
  getUserAfterPaginationAndSearchAndFilter: any
  prevChecked: Boolean
}

const PaginationBlock: React.FunctionComponent<PaginationBlockProps> = ({
  pagination,
  dispatch,
  checked,
  valueSearchBox,
  getUserAfterPaginationAndSearchAndFilter,
  prevChecked
}) => {
  const limitRender = pagination.limitUsersForRender
  const { numberPage } = pagination
  const [timerId, setTimerId]: any = useState(undefined)
  const [prevCountUsers, setPrevCountUsers]: any = useState(undefined)
  const [users, setUsers]: any = useState(undefined)

  useEffect(() => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: 1,
        limitUsersForRender: limitRender
      })
    )
    // call function after click checkbox or search. refund value
    if (
      numberPage !== 1 ||
      prevChecked ||
      valueSearchBox.length > 2 ||
      checked
    ) {
      clearTimeout(timerId)
      const clearInterval = setTimeout(async () => {
        const users = await getUserAfterPaginationAndSearchAndFilter(
          1,
          limitRender
        )
        setUsers(users)
      }, 500)
      setPrevCountUsers(undefined)
      setTimerId(clearInterval)
    }
  }, [checked, valueSearchBox.length > 2 && valueSearchBox])

  const handleChangeSelect = async (newLimitRender: any) => {
    dispatch(
      setValuesForPaginationAction({
        numberPage:
          Math.ceil((+numberPage * +limitRender) / +newLimitRender) || 1,
        limitUsersForRender: +newLimitRender
      })
    )
    let users = await getUserAfterPaginationAndSearchAndFilter(
      Math.ceil((+numberPage * +limitRender) / +newLimitRender) || 1,
      +newLimitRender
    )
    setUsers(users)
    if (users[0] && users[0].countUsers !== undefined)
      setPrevCountUsers(users[0].countUsers)
    else {
      if (prevCountUsers) {
        dispatch(
          setValuesForPaginationAction({
            numberPage: Math.ceil(prevCountUsers / +newLimitRender) || 1,
            limitUsersForRender: +newLimitRender
          })
        )
        users = await getUserAfterPaginationAndSearchAndFilter(
          Math.ceil(prevCountUsers / +newLimitRender) || 1,
          +newLimitRender
        )
        setUsers(users)
      }
    }
  }

  const handlerClickPrevPage = async () => {
    if (numberPage > 1) {
      dispatch(
        setValuesForPaginationAction({
          numberPage: +numberPage - 1,
          limitUsersForRender: limitRender
        })
      )
      const users = await getUserAfterPaginationAndSearchAndFilter(
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
    const users = await getUserAfterPaginationAndSearchAndFilter(
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
          value={limitRender || 0}
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
          <button onClick={() => handlerClickPrevPage()}>prev</button>
        )}
        <div>{numberPage}</div>
        {users &&
          users[0] &&
          users[0].countPage !== undefined &&
          users[0].countPage > numberPage && (
            <button onClick={() => handlerClickNextPage()}>next</button>
          )}
      </div>
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  pagination: state.pagination.pagination
})

export default connect(mapStateToProps)(PaginationBlock)

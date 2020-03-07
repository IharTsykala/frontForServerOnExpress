import React, { useEffect, useState } from "react"
import PaginationBlockCSS from "./PaginationBlock.module.css"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { Pagination } from "../../Redux/interfaces/pagination.interface"
import Service from "../../services/service-user"
// import { setLimitUsersForRenderAction } from "../../Redux/store/pagination/pagination.actions"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"

type PaginationBlockProps = {
  user: User
  pagination: Pagination
  dispatch: any
  checked: boolean
  valueSearchBox: String | ""
  setUsers: any
}

const PaginationBlock: React.FunctionComponent<PaginationBlockProps> = ({
  user,
  pagination,
  dispatch,
  checked,
  valueSearchBox,
  setUsers
}) => {
  const limitRender = pagination.limitUsersForRender
  const { numberPage } = pagination
  // const [numberPage, setNumberPage] = useState(1)
  // const [limitRender, setLimitRender] = useState(0)

  // useEffect(() => {

  // }, [input])

  const getUserAfterPaginationAndSearchAndFilter = async (
    numberPage: number,
    limitRender: number
  ) => {
    let body = {}
    if (valueSearchBox.length > 2) {
      body = Object.assign({}, body, {
        idLogInUser: user._id,
        valueSearchBox,
        numberPage,
        checked,
        limitRender
      })
    } else
      body = Object.assign({}, body, {
        idLogInUser: user._id,
        valueSearchBox: "",
        numberPage,
        checked,
        limitRender
      })
    const listUsers = await Service.getUserAfterPaginationAndSearchAndFilter(
      body
    )
    setUsers(listUsers)
  }

  const handleChangeSelect = (limitRender: any) => {
    // setLimitRender(+limitRender)
    dispatch(
      setValuesForPaginationAction({
        numberPage,
        limitUsersForRender: +limitRender
      })
    )
    getUserAfterPaginationAndSearchAndFilter(numberPage, +limitRender)
  }

  const handlerClickPrevPage = () => {
    if (numberPage > 1) {
      // setNumberPage(numberPage - 1)
      dispatch(
        setValuesForPaginationAction({
          numberPage: numberPage - 1,
          limitUsersForRender: limitRender
        })
      )
      getUserAfterPaginationAndSearchAndFilter(numberPage - 1, limitRender)
    }
  }

  const handlerClickNextPage = () => {
    // setNumberPage(numberPage + 1)
    dispatch(
      setValuesForPaginationAction({
        numberPage: numberPage + 1,
        limitUsersForRender: limitRender
      })
    )
    getUserAfterPaginationAndSearchAndFilter(numberPage + 1, limitRender)
  }

  return (
    <section className={PaginationBlockCSS.All_Users__Pagination_Block}>
      <div
        className={PaginationBlockCSS.All_Users__Pagination_Block__Select_block}
      >
        <InputLabel htmlFor="outlined-age-native-simple">
          Amount Users
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
          <option value={""}></option>
          <option value={0}>{"all users"}</option>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={8}>8</option>
        </Select>
      </div>
      <div
        className={PaginationBlockCSS.All_Users__Pagination_Block__Button_block}
      >
        <button onClick={() => handlerClickPrevPage()}>prev</button>
        <div>{numberPage}</div>
        <button onClick={() => handlerClickNextPage()}>next</button>
      </div>
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  pagination: state.pagination.pagination
})

export default connect(mapStateToProps)(PaginationBlock)

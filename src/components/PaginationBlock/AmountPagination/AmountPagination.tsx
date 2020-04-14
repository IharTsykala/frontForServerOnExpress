import React from "react"
import AmountPaginationCSS from "./AmountPagination.module.css"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import { connect } from "react-redux"
import { User } from "../../../Redux/entitiesInterface/user.interface"
import { Pagination } from "../../../Redux/entitiesInterface/pagination.interface"
import { setValuesForPaginationAction } from "../../../Redux/store/pagination/pagination.actions"

type AmountPaginationProps = {
  allUsers: [User]
  pagination: Pagination
  dispatch: any
  getUsersAfterPaginationAndSearchAndFilter: any
}

const AmountPagination: React.FunctionComponent<AmountPaginationProps> = ({
  allUsers,
  pagination,
  dispatch,
  getUsersAfterPaginationAndSearchAndFilter
}) => {
  const limitRender = pagination.limitUsersForRender
  const { numberPage } = pagination

  const handleChangeSelect = (newLimitRender: any) => {
    let page
    if (
      allUsers &&
      allUsers[0] &&
      allUsers[0].countUsers !== undefined &&
      +numberPage * +limitRender > allUsers[0].countUsers
    ) {
      page = Math.ceil(+allUsers[0].countUsers / +newLimitRender)
    } else {
      page = Math.ceil((+numberPage * +limitRender) / +newLimitRender)
    }
    dispatch(
      setValuesForPaginationAction({
        numberPage: page || 1,
        limitUsersForRender: +newLimitRender
      })
    )
    getUsersAfterPaginationAndSearchAndFilter(page || 1, +newLimitRender)
  }

  return (
    <div
      className={AmountPaginationCSS.All_Users__Pagination_Block__Select_block}
    >
      <InputLabel htmlFor="outlined-age-native-simple">
        Amount of Users
      </InputLabel>
      <Select native onChange={e => handleChangeSelect(e.target.value)}>
        <option value={0}>{"all users"}</option>
        <option value={2}>2</option>
        <option value={4}>4</option>
        <option value={8}>8</option>
      </Select>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  allUsers: state.user.allUsers,
  pagination: state.pagination.pagination
})

export default connect(mapStateToProps)(AmountPagination)

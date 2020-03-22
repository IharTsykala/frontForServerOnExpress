// import React from 'react'
import React from "react"
import NumberBlockPaginationCSS from "./NumberBlockPagination.module.css"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { Pagination } from "../../../Redux/interfaces/pagination.interface"
import { setValuesForPaginationAction } from "../../../Redux/store/pagination/pagination.actions"
import Button from "@material-ui/core/Button"

type NumberBlockPaginationProps = {
  allUsers: [User]
  pagination: Pagination
  dispatch: any
  getUsersAfterPaginationAndSearchAndFilter: any
}

const NumberBlockPagination: React.FunctionComponent<NumberBlockPaginationProps> = ({
  allUsers,
  pagination,
  dispatch,
  getUsersAfterPaginationAndSearchAndFilter
}) => {
  const limitRender = pagination.limitUsersForRender
  const { numberPage } = pagination

  const handlerClickPrevPage = () => {
    if (numberPage > 1) {
      dispatch(
        setValuesForPaginationAction({
          numberPage: +numberPage - 1,
          limitUsersForRender: limitRender
        })
      )
      getUsersAfterPaginationAndSearchAndFilter(+numberPage - 1, limitRender)
    }
  }

  const handlerClickNextPage = () => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: +numberPage + 1,
        limitUsersForRender: limitRender
      })
    )
    getUsersAfterPaginationAndSearchAndFilter(+numberPage + 1, limitRender)
  }

  return (
    <div
      className={
        NumberBlockPaginationCSS.All_Users__Pagination_Block__Button_block
      }
    >
      <Button
        variant="outlined"
        component="span"
        onClick={() => handlerClickPrevPage()}
        disabled={numberPage < 2 && true}
      >
        Prev
      </Button>

      <div>{numberPage}</div>

      <Button
        variant="outlined"
        component="span"
        onClick={() => handlerClickNextPage()}
        disabled={
          (!limitRender && true) ||
          (allUsers &&
            allUsers[0] &&
            allUsers[0].countPage !== undefined &&
            allUsers[0].countPage === numberPage &&
            true)
        }
      >
        Next
      </Button>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  allUsers: state.allUsers.allUsers,
  pagination: state.pagination.pagination
})

export default connect(mapStateToProps)(NumberBlockPagination)

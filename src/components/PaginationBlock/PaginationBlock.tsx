import React, { useEffect, useState } from "react"
import PaginationBlockCSS from "./PaginationBlock.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { Pagination } from "../../Redux/interfaces/pagination.interface"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"
import { getAllUsers } from "../../Redux/store/user/user.actions"
import { getAllUsersAfterPagination } from "../../Redux/store/user/user.actions"
import AmountPagination from "./AmountPagination/AmountPagination"
import NumberBlockPagination from "./NumberBlockPagination/NumberBlockPagination"

type PaginationBlockProps = {
  user: User
  pagination: Pagination
  dispatch: any
  checked: boolean
  prevChecked: boolean
  valueSearchBox: string
}

const PaginationBlock: React.FunctionComponent<PaginationBlockProps> = ({
  user,
  pagination,
  dispatch,
  checked,
  prevChecked,
  valueSearchBox
}) => {
  const limitRender = pagination.limitUsersForRender
  const { numberPage } = pagination
  const [timerId, setTimerId]: any = useState(undefined)

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
      dispatch(getAllUsersAfterPagination(body))
    } else {
      if (user._id) dispatch(getAllUsers(user._id))
      dispatch(
        setValuesForPaginationAction({
          numberPage: 1,
          limitUsersForRender: limitRender
        })
      )
    }
  }

  useEffect(() => {
    getUsersAfterPaginationAndSearchAndFilter(numberPage, limitRender)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberPage, limitRender, user])

  useEffect(() => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: 1,
        limitUsersForRender: limitRender
      })
    )
    // call function after click checkbox or search
    if (prevChecked !== undefined || valueSearchBox) {
      clearTimeout(timerId)
      const clearInterval = setTimeout(() => {
        getUsersAfterPaginationAndSearchAndFilter(1, limitRender)
      }, 500)
      setTimerId(clearInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, valueSearchBox])

  return (
    <section className={PaginationBlockCSS.All_Users__Pagination_Block}>
      <AmountPagination
        getUsersAfterPaginationAndSearchAndFilter={
          getUsersAfterPaginationAndSearchAndFilter
        }
      />
      <NumberBlockPagination
        getUsersAfterPaginationAndSearchAndFilter={
          getUsersAfterPaginationAndSearchAndFilter
        }
      />
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user.user,
  pagination: state.pagination.pagination,
  checked: state.pagination.checkBox.checkBoxState,
  prevChecked: state.pagination.checkBox.prevCheckBoxState,
  valueSearchBox: state.pagination.searchString,
})

export default connect(mapStateToProps)(PaginationBlock)

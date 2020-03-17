import React, { useEffect, useState } from "react"
import PaginationBlockCSS from "./PaginationBlock.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { Pagination } from "../../Redux/interfaces/pagination.interface"
import { setValuesForPaginationAction } from "../../Redux/store/pagination/pagination.actions"
import { getAllUsersForSagasAction } from "../../Redux/store/allUsers/allUsers.actions"
import { getAllUsersWithPaginationSearchFilterAction } from "../../Redux/store/allUsersWithPaginationSearchFilter/allUsersWithPaginationSearchFilter.actions"
import AmountPagination from './AmountPagination/AmountPagination'
import NumberBlockPagination from './NumberBlockPagination/NumberBlockPagination'

type PaginationBlockProps = {
  user: User  
  pagination: Pagination
  dispatch: any
  checked: Boolean
  prevChecked: Boolean
  valueSearchBox: String | ""
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

  const getUsersAfterPaginationAndSearchAndFilter = (
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
      dispatch(getAllUsersWithPaginationSearchFilterAction(body))
    } else {
      if (user._id) dispatch(getAllUsersForSagasAction(user._id))
      else dispatch(getAllUsersForSagasAction(""))
      dispatch(
        setValuesForPaginationAction({
          numberPage: 1,
          limitUsersForRender: limitRender
        })
      )
    }
  }

  useEffect(() => {
    try {
      getUsersAfterPaginationAndSearchAndFilter(numberPage, limitRender)
    } catch (e) {
      console.log(e)
    }
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
    if (prevChecked !== undefined) {
      console.log(1)
      clearTimeout(timerId)
      const clearInterval = setTimeout(async () => {
        await getUsersAfterPaginationAndSearchAndFilter(1, limitRender)
      }, 500)
      setTimerId(clearInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, valueSearchBox])

  return (
    <section className={PaginationBlockCSS.All_Users__Pagination_Block}>      
      <AmountPagination
       getUsersAfterPaginationAndSearchAndFilter={getUsersAfterPaginationAndSearchAndFilter}
       />
       <NumberBlockPagination getUsersAfterPaginationAndSearchAndFilter={getUsersAfterPaginationAndSearchAndFilter}/>      
    </section>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,  
  pagination: state.pagination.pagination,
  checked: state.checkBoxState.checkBoxState,
  prevChecked: state.checkBoxState.prevCheckBoxState,
  valueSearchBox: state.searchStringState.searchStringState
})

export default connect(mapStateToProps)(PaginationBlock)

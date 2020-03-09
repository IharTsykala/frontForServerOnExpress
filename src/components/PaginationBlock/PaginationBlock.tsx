import React, { useEffect } from "react"
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

  useEffect(() => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: 1,
        limitUsersForRender: limitRender
      })
    )
    if (numberPage !== 1 || prevChecked)
      getUserAfterPaginationAndSearchAndFilter(1, limitRender)
  }, [checked, valueSearchBox.length > 2 && valueSearchBox])

  const handleChangeSelect = (limitRender: any) => {
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
      dispatch(
        setValuesForPaginationAction({
          numberPage: +numberPage - 1,
          limitUsersForRender: limitRender
        })
      )
      getUserAfterPaginationAndSearchAndFilter(+numberPage - 1, limitRender)
    }
  }

  const handlerClickNextPage = () => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: +numberPage + 1,
        limitUsersForRender: limitRender
      })
    )
    getUserAfterPaginationAndSearchAndFilter(+numberPage + 1, limitRender)
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

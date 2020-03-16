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
import { getAllUsersWithPaginationSearchFilterAction } from "../../Redux/store/allUsersWithPaginationSearchFilter/allUsersWithPaginationSearchFilter.actions"

type PaginationBlockProps = {
  user: User
  allUsers: [User]
  pagination: Pagination
  dispatch: any
  checked: Boolean
  prevChecked: Boolean
  valueSearchBox: String | ""  
}

const PaginationBlock: React.FunctionComponent<PaginationBlockProps> = ({
  user,
  allUsers,
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
      firstRender()      
      dispatch(
        setValuesForPaginationAction({
          numberPage: 1,
          limitUsersForRender: limitRender
        })
      )
    }
  }

  const firstRender = useCallback(async () => {
    try {
      if (user._id) dispatch(getAllUsersForSagasAction(user._id))
      else dispatch(getAllUsersForSagasAction(""))      
    } catch (e) {
      console.log(e)
    }
  }, [user._id, dispatch])

  useEffect(() => {
    firstRender()
  }, [firstRender, user])

  useEffect(() => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: 1,
        limitUsersForRender: limitRender
      })
    )
    
    // call function after click checkbox or search
    if (prevChecked!==undefined) {
      console.log(1)
      clearTimeout(timerId)
      const clearInterval = setTimeout(async () => {
        await getUsersAfterPaginationAndSearchAndFilter(
          1,
          limitRender
        )        
      }, 500)      
      setTimerId(clearInterval)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, valueSearchBox])

  const handleChangeSelect = async (newLimitRender: any) => {    
    let page
    if (
      allUsers &&
      allUsers[0] &&
      allUsers[0].countUsers !== undefined &&
      (+numberPage * +limitRender) > allUsers[0].countUsers)
     {     
      page = Math.ceil(+allUsers[0].countUsers / +newLimitRender)
    } else {      
      page = Math.ceil((+numberPage * +limitRender) / +newLimitRender)
    }
    dispatch(
      setValuesForPaginationAction({
        numberPage:
        page || 1,
        limitUsersForRender: +newLimitRender
      })
    )    
     await getUsersAfterPaginationAndSearchAndFilter(
      page || 1,
      +newLimitRender
    )    
  }

  const handlerClickPrevPage = async () => {
    if (numberPage > 1) {
      dispatch(
        setValuesForPaginationAction({
          numberPage: +numberPage - 1,
          limitUsersForRender: limitRender
        })
      )
      await getUsersAfterPaginationAndSearchAndFilter(
        +numberPage - 1,
        limitRender
      )     
    }
  }

  const handlerClickNextPage = async () => {
    dispatch(
      setValuesForPaginationAction({
        numberPage: +numberPage + 1,
        limitUsersForRender: limitRender
      })
    )
    await getUsersAfterPaginationAndSearchAndFilter(
      +numberPage + 1,
      limitRender
    )   
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
  prevChecked: state.checkBoxState.prevCheckBoxState,
  valueSearchBox: state.searchStringState.searchStringState
})

export default connect(mapStateToProps)(PaginationBlock)

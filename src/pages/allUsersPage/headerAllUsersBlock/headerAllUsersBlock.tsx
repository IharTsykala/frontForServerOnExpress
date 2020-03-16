import React from "react"
import headerAllUsersPageCSS from "./headerAllUsersPage.module.css"
import Search from "../../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import { connect } from "react-redux"
import {
  changeCheckBoxStateAction,
  setPrevCheckBoxStateAction
} from "../../../Redux/store/checkBoxState/checkBoxState.actions"

type HeaderAllUsersBlockProps = {
  checkBoxState: boolean
  dispatch: any
}

const HeaderAllUsersBlock: React.FunctionComponent<HeaderAllUsersBlockProps> = ({
  checkBoxState,
  dispatch
}) => {
  const handleClickFriendCheckBox = async () => {
    dispatch(setPrevCheckBoxStateAction(checkBoxState))
    dispatch(changeCheckBoxStateAction())
  }

  return (
    <div className={headerAllUsersPageCSS.container__all_users__header}>
      <Search />
      <h2>Make friends</h2>
      <div
        className={
          headerAllUsersPageCSS.container__all_users__header__checkboxBlock
        }
      >
        <p>Filter</p>
        <Checkbox
          checked={checkBoxState}
          onClick={() => handleClickFriendCheckBox()}
          className={
            headerAllUsersPageCSS.container__all_users__header__sort_checkbox
          }
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  checkBoxState: state.checkBoxState.checkBoxState
})

export default connect(mapStateToProps)(HeaderAllUsersBlock)

import React from "react"
import headerAllUsersPageCSS from "./headerAllUsersPage.module.css"
import Search from "../../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import { connect } from "react-redux"
import { CheckBoxState } from "../../../Redux/interfaces/checkBoxState.interface"
import { changeCheckBoxStateAction } from "../../../Redux/store/checkBoxState/checkBoxState.actions"

type HeaderAllUsersBlockProps = {
  checkBoxState: CheckBoxState
  // dispatch: any
  // allUsers: []
  // getLogInUserAllSubscriptionsAndObserver:any
}

const HeaderAllUsersBlock: React.FunctionComponent<HeaderAllUsersBlockProps> = ({checkBoxState}) => {
  const handleClickFriendCheckBox = async () => {
      // Need read dispatch action
    // setPrevChecked(checkBoxState)
    changeCheckBoxStateAction(checkBoxState)
  }

  return (
    <div className={headerAllUsersPageCSS.container__all_users__header}>
      <Search />
      <h2>Make friends</h2>
      <div className={headerAllUsersPageCSS.container__all_users__header__checkboxBlock}>
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
  checkBoxState: state.checkBoxState.checkBoxState.checkBoxState
})

export default connect(mapStateToProps)(HeaderAllUsersBlock)

// export default HeaderAllUsersBlock

{/* <Search />
<h3>Make friends</h3>
<div className={headerAllUsersPageCSS.container__all_users__header__checkboxBlock}>
<Checkbox
  // checked={checked}
  // onClick={() => handleClickFriendCheckBox()}
  className={
    headerAllUsersPageCSS.container__all_users__header__sort_checkbox
  }            
/>
</div> */} 

// this need carry out in sagas// this need carry out in sagas// this need carry out in sagas
// this need carry out in sagas// this need carry out in sagas// this need carry out in sagas

// it probably dont need

// useEffect(() => {
//   getFilteredArrayUsers(valueSearchBox)
// }, [getFilteredArrayUsers, valueSearchBox])

// const getFilteredArrayUsers = useCallback(async (valueSearchBox: any) => {
//     try {
//       if (valueSearchBox.length === 2) {
//         await getLogInUserAllSubscriptionsAndObserver()
//       }
//     } catch (e) {
//       console.log(e)
//     }
//   }, [getLogInUserAllSubscriptionsAndObserver])

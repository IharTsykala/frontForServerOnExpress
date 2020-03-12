import React from "react"
import headerAllUsersPageCSS from "./headerAllUsersPage.module.css"
import Search from "../../../components/Search/Search"
import Checkbox from "@material-ui/core/Checkbox"
import { connect } from "react-redux"
import { User } from "../../../Redux/interfaces/user.interface"
import { AllUsersAction } from "../../../Redux/store/allUsers/allUsers.actions"

type HeaderAllUsersBlockProps = {
    // user: User
    // dispatch: any
    // allUsers: []
    // getLogInUserAllSubscriptionsAndObserver:any
  }

const HeaderAllUsersBlock: React.FunctionComponent<HeaderAllUsersBlockProps> = () => {  
      
    // const handleClickFriendCheckBox = async () => {
    //     // Need read dispatch action
    //   setPrevChecked(checked)
    //   setChecked(!checked)
    // }  
    
    return (
        <div className={headerAllUsersPageCSS.container__all_users__header}>
        <Search/>
        <h2>Make friends</h2>
        <Checkbox
          // checked={checked}
          // onClick={() => handleClickFriendCheckBox()}
          className={
            headerAllUsersPageCSS.container__all_users__header__sort_checkbox
          }
        />
      </div>
    )
}

export default HeaderAllUsersBlock


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
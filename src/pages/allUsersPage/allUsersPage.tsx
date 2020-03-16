import React from "react"
import HeaderAllUsersBlock from "./headerAllUsersBlock/headerAllUsersBlock"
import MainAllUsersBlock from "./mainAllUsersBlock/mainAllUsersBlock"
import PaginationBlock from "../../components/PaginationBlock/PaginationBlock"
import allUsersPageCSS from "./allUsersPage.module.css"

const AllUsersPage: React.FunctionComponent = () => {
  return (
    <div className={allUsersPageCSS.container__all_users}>
      <HeaderAllUsersBlock />
      <MainAllUsersBlock />
      <PaginationBlock/> 
    </div>
  )
}

export default AllUsersPage

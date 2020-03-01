import React from "react"
import GetStartPageCSS from "./GetStartPage.module.css"

export const GetStartPage: React.FC = () => {
  return (
    <>
      <h1
        className={GetStartPageCSS.main__container__start_page__header}
      >{`You are in the best application :))`}</h1>
    </>
  )
}

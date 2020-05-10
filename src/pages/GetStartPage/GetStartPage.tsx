import React from "react"
import GetStartPageCSS from "./GetStartPage.module.css"
import { Typography, Box } from "@material-ui/core"

export const GetStartPage: React.FC = () => {
  return (
    <Box
      component={"div"}
      className={GetStartPageCSS.main__start_page__container}
    >
      <Typography
        variant="h2"
        component="h2"
        className={GetStartPageCSS.main__container__start_page__header}
      >
        {`You are in the best application :))`}
      </Typography>
    </Box>
  )
}

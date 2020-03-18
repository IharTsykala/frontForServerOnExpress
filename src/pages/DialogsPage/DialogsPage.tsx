import React from "react"
import DialogsPageCSS from "./DialogsPage.module.css"
import WindowDialog from "../../components/WindowDialog/WindowDialog"
import PanelDialogs from "../../components/PanelDialogs/PanelDialogs"
import Box from "@material-ui/core/Box"

const DialogsPage: React.FunctionComponent<any> = () => {
  return (
    
      <Box
        component="div"
        display="grid"
        // p={1}
        // m={1}
        // bgcolor="background.paper"
        className={DialogsPageCSS.dialogs_page}>         
        <PanelDialogs />
        <WindowDialog />
      </Box>
   
  )
}

export default DialogsPage

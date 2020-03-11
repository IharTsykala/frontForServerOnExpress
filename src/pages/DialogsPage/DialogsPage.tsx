import React from "react"
import DialogsPageCSS from "./DialogsPage.module.css"
import WindowDialog from "../../components/WindowDialog/WindowDialog"
import PanelDialogs from "../../components/PanelDialogs/PanelDialogs"

const DialogsPage: React.FunctionComponent<any> = () => {
  return (
    <>
      <div className={DialogsPageCSS.dialogs_page}>
        <PanelDialogs />
        <WindowDialog />
      </div>
    </>
  )
}

export default DialogsPage

import React, { useState, useEffect, useCallback } from "react"
import PanelDialogsCSS from "./PanelDialogs.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import ServiceDialog from "../../services/service-dialog"
import { LoadingState } from "../../shared/constants/user-from-view-mode.enum"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { currentDialogAction } from "../../Redux/store/currentDialog/currentDialog.actions"
import { getAllUsersForSagasAction } from "../../Redux/store/allUsers/allUsers.actions"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
// import Divider from "@material-ui/core/Divider"

type PanelDialogsProps = {
  user: User
  dispatch: any
  allUsers: [User]
}

const PanelDialogs: React.FunctionComponent<PanelDialogsProps> = ({
  user,
  dispatch,
  allUsers
}) => {
  const [listDialogs, setListDialogs]: any = useState([])
  const [stateLoading, setStateLoading]: any = useState(LoadingState.loading)
  const [flagModalWindow, setFlagModalWindow]: any = useState(false)

  const getListDialogs = useCallback(async () => {
    try {
      if (user._id) {
        const listForRender = await ServiceDialog.getAllDialogsById(user._id)
        console.log(listForRender)
        if (listForRender) {
          setStateLoading(LoadingState.loaded)
          setListDialogs(listForRender)
        }
        if (allUsers[0]._id === undefined)
          dispatch(getAllUsersForSagasAction(user._id))
      }
    } catch (e) {
      console.log(e)
      setStateLoading(LoadingState.loaded)
    }
  }, [allUsers, dispatch, user._id])

  useEffect(() => {
    getListDialogs()
  }, [getListDialogs, user])

  const handlerClickButton = () => {
    setFlagModalWindow(!flagModalWindow)
    if(flagModalWindow)dispatch(getAllUsersForSagasAction(user._id) )
  }

  async function sendDialog(
    userId: String,
    thisUserId: String,
    thisUserLogin: String
  ) {
    try {
      await ServiceDialog.addDialog({
        dialogName: thisUserLogin,
        members: [userId, thisUserId]
      })
      getListDialogs()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (
        <Box
          component="div"
          display="grid"
          className={PanelDialogsCSS.dialogs_page__rules_dialogs}
        >
          <List
            className={
              PanelDialogsCSS.dialogs_page__rules_dialogs__list_dialogs
            }
          >
            {(listDialogs.length > 0 &&
              !flagModalWindow &&
              listDialogs.map((dialog: any) => (
                <ListItem
                  key={dialog._id}
                  button
                  onClick={() => dispatch(currentDialogAction(dialog))}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${dialog._id}`}
                      src={
                        (dialog.members.avatar &&
                          `http://localhost:8080/images/users/${dialog.members._id}/${dialog.members.avatar}`) ||
                        `http://localhost:8080/images/pattern-avatar.jpg`
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={dialog._id}
                    primary={`${dialog.members.login}`}
                  />
                  {/* <Divider variant="inset" component="li" />             */}
                </ListItem>
              ))) ||
              (allUsers.length > 0 &&
                flagModalWindow &&
                allUsers.map((secondUser: any) => (
                  <ListItem
                    key={secondUser._id}
                    button
                    onClick={() =>
                      sendDialog(user._id, secondUser._id, secondUser.login)
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${secondUser._id}`}
                        src={
                          (secondUser.avatar &&
                            `http://localhost:8080/images/users/${secondUser._id}/${secondUser.avatar}`) ||
                          `http://localhost:8080/images/pattern-avatar.jpg`
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      id={secondUser._id}
                      primary={`${secondUser.login}`}
                    />
                    {/* <Divider variant="inset" component="li" />          */}
                  </ListItem>
                )))}
          </List>
          <Button
            className={PanelDialogsCSS.dialogs_page__add_dialogs_button}
            variant="outlined"
            component="button"
            onClick={() => handlerClickButton()}
          >
            {(!flagModalWindow && "Add Dialog") ||
              (flagModalWindow && "Menu Dialogs")}
          </Button>
        </Box>
      )}
      {stateLoading === "notFound" && <h1>not found</h1>}
      {stateLoading === "error" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  allUsers: state.allUsers.allUsers,
  currentDialog: state.currentDialog.currentDialog
})

export default connect(mapStateToProps)(PanelDialogs)

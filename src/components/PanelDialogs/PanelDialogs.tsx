import React, { useState, useEffect, useCallback } from "react"
import PanelDialogsCSS from "./PanelDialogs.module.css"
import { connect } from "react-redux"
import { User } from "../../Redux/entitiesInterface/user.interface"
import { Dialog } from "../../Redux/entitiesInterface/dialog.interface"
import { LoadingState } from "../../shared/constants/user-from-view-mode.enum"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { setCurrentDialogInStore } from "../../Redux/store/dialogs/dialogs.actions"
import { getAllUsers } from "../../Redux/store/user/user.actions"
import { getAllDialogsByUserId } from "../../Redux/store/dialogs/dialogs.actions"
import { addNewDialog } from "../../Redux/store/dialogs/dialogs.actions"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

type PanelDialogsProps = {
  user: User,
  dispatch: any,
  allUsers: [User],
  currentDialog: Dialog,
  listDialogs: [Dialog],
}

const PanelDialogs: React.FunctionComponent<PanelDialogsProps> = ({
  user,
  dispatch,
  allUsers,
  currentDialog,
  listDialogs,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stateLoading, setStateLoading] = useState(LoadingState.Loaded)
  const [flagModalWindow, setFlagModalWindow] = useState(false)

  const getListDialogs = useCallback(async () => {
    if (user._id) {
      dispatch(getAllDialogsByUserId(user._id))
      if (allUsers[0]._id === undefined) dispatch(getAllUsers(user._id))
    }
  }, [allUsers, dispatch, user._id])

  useEffect(() => {
    getListDialogs()
  }, [getListDialogs, user])

  const handlerClickButton = () => {
    setFlagModalWindow(!flagModalWindow)
    if (flagModalWindow) dispatch(getAllUsers(user._id))
  }

  async function sendDialog(
    userId: String,
    thisUserId: String,
    thisUserLogin: String
  ) {
    dispatch(
      addNewDialog({
        dialogName: thisUserLogin,
        members: [userId, thisUserId],
      })
    )
    getListDialogs()
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
              listDialogs[0]._id &&
              !flagModalWindow &&
              listDialogs.map((dialog: any) => (
                <ListItem
                  key={dialog._id}
                  button
                  onClick={() => dispatch(setCurrentDialogInStore(dialog))}
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
  user: state.user.user,
  allUsers: state.user.allUsers,
  currentDialog: state.dialog.currentDialog,
  listDialogs: state.dialog.allDialogs,
})

export default connect(mapStateToProps)(PanelDialogs)

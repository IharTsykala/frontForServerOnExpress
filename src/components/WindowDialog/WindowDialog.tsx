import React, { useState, useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { Message } from "../../Redux/interfaces/message.interface"
import { Dialog } from "../../Redux/interfaces/dialog.interface"
import openSocket from "socket.io-client"
import WindowDialogCSS from "./WindowDialog.module.css"
import { getAllMessagesCurrentDialogAction } from "../../Redux/store/listMessagesForCurrentDialog/listMessagesForCurrentDialog.actions"
import { getNewMessageForCurrentDialogAction } from "../../Redux/store/listMessagesForCurrentDialog/listMessagesForCurrentDialog.actions"
// const socket = openSocket("http://localhost:8000/myDialogs")
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ImageIcon from "@material-ui/icons/Image"
const socket = openSocket("http://localhost:8000", { reconnection: true })

type WindowDialogProps = {
  user: User
  dispatch: any
  currentDialog: Dialog
  listMessagesForCurrentDialog: [Message]
}

const WindowDialog: React.FunctionComponent<WindowDialogProps> = ({
  user,
  dispatch,
  currentDialog,
  listMessagesForCurrentDialog
}) => {
  // const [listMessage, setListMessage]: any = useState([])
  const [valueInput, setValueInput] = useState("")

  const getMessagesFromBD = useCallback(async () => {
    dispatch(getAllMessagesCurrentDialogAction(currentDialog._id))
  }, [currentDialog._id, dispatch])

  const addMessageState = useCallback(
    (message: any) => {
      try {
        // setListMessage((prevState:any)=>{
        //   return [...prevState, message]
        // })
        dispatch(getNewMessageForCurrentDialogAction(message))
      } catch (e) {
        console.log(e)
      }
    },
    [dispatch]
  )

  useEffect(() => {
    socket.on("receiveMessageDialog", (message: Message) => {
      addMessageState(message)
    })
  }, [addMessageState])

  const joinInRoom = useCallback(async () => {
    socket.emit("join", currentDialog)
    await getMessagesFromBD()
    setValueInput("")
  }, [currentDialog, getMessagesFromBD])

  useEffect(() => {
    if (currentDialog._id !== undefined) {
      joinInRoom()
    }
    return () => {
      socket.emit("end")
    }
  }, [currentDialog._id, joinInRoom])

  useEffect(() => {
    return () => {
      socket.removeAllListeners()
    }
  }, [])

  function sendMessage(e: any) {
    e.preventDefault()
    const message = {
      idDialog: currentDialog._id,
      authorLogin: user.login,
      authorId: user._id,
      message: valueInput
    }
    socket.emit("messageDialog", message)
    setValueInput("")
  }

  const handlerClickButton = (e: any) => {
    sendMessage(e)
  }

  const handlerChangeInput = (e: any) => {
    setValueInput(e.target.value)
  }

  return (
    <Box
      component="div"
      display="grid"
      className={WindowDialogCSS.dialogs_page__dialog_page__window_dialog}
    >
      <Box
        component="ul"
        display="grid"
        className={
          WindowDialogCSS.dialogs_page__dialog_page__window_dialog__list_message
        }
      >
        {listMessagesForCurrentDialog &&
          listMessagesForCurrentDialog.length > 0 &&
          listMessagesForCurrentDialog[0]._id !== undefined &&
          listMessagesForCurrentDialog.map((message: Message) => (
            <React.Fragment key={message._id}>
              <ListItem
                className={
                  (message.authorId === user._id &&
                    WindowDialogCSS.dialogs_page__message__left_side) ||
                  WindowDialogCSS.dialogs_page__message__right_side
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${message.authorLogin}`}
                  secondary={`${message.message}`}
                />
              </ListItem>
            </React.Fragment>
          ))}
      </Box>
      <Box
        component="div"
        display="grid"
        className={
          WindowDialogCSS.dialogs_page__add_dialogs__block_button_input
        }
      >
        <TextField
          id="outlined-full-width"
          variant="outlined"
          label="Input Message"
          className={WindowDialogCSS.dialogs_page__add_dialogs_input}
          type="text"
          value={valueInput}
          onChange={e => handlerChangeInput(e)}
        />
        <Button
          className={WindowDialogCSS.dialogs_page__add_dialogs_button}
          onClick={(e: any) => handlerClickButton(e)}
          variant="outlined"
          component="button"
          disabled={currentDialog._id === undefined && true}
        >
          {currentDialog._id === undefined ? "Chose Dialog" : "Send Message"}
        </Button>
      </Box>
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  currentDialog: state.dialog.currentDialog,
  listMessagesForCurrentDialog:
    state.listMessagesForCurrentDialog.listMessagesForCurrentDialog
})

export default connect(mapStateToProps)(WindowDialog)

// var element = document.getElementById("yourDivID");
// element.scrollTop = element.scrollHeight;

// "preserveNullAndEmptyArrays": true

  // white-space: pre-wrap;
    // word-break: break-word
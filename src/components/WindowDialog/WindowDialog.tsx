import React, { useState, useEffect, useCallback } from "react"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { CurrentDialog } from "../../Redux/interfaces/currentDialog.interface"
import {Message} from '../../Redux/interfaces/message.interface'
import openSocket from "socket.io-client"
import WindowDialogCSS from "./WindowDialog.module.css"
import ServiceMessage from "../../services/service-message"
import { getAllMessagesCurrentDialogAction } from "../../Redux/store/listMessagesForCurrentDialog/listMessagesForCurrentDialog.actions"
import { getNewMessageInCurrentDialogAction } from "../../Redux/store/listMessagesForCurrentDialog/listMessagesForCurrentDialog.actions"
import { disconnect } from "cluster"
const socket = openSocket("http://localhost:8000",{reconnection: true})
// const socket = openSocket("http://localhost:8000/myDialogs")

type WindowDialogProps = {
  user: User
  dispatch: any
  currentDialog: CurrentDialog
  listMessagesForCurrentDialog: []
}

const WindowDialog: React.FunctionComponent<WindowDialogProps> = ({
  user,
  dispatch,
  currentDialog,
  listMessagesForCurrentDialog
}) => {
  const [listMessage, setListMessage]: any = useState([])
  const [valueInput, setValueInput]: any = useState("")

  const getMessagesFromBD = async () => {
    const list = await ServiceMessage.getAllMessagesByIdDialog(currentDialog._id)
    console.log('getMessagesFromBD')
    dispatch(getAllMessagesCurrentDialogAction(list))  
    setListMessage(list)

  }
  // socket.on("messageDialog2", (message: any) => addMessageState(message))

  const connectSocket = async()=> {
    if (currentDialog._id !== undefined) { 
      socket.emit("join", currentDialog)
      socket.on("messageDialog2", (message: any) => {addMessageState(message)
        // console.log(listMessage)
      })
     await getMessagesFromBD()   
    //  socket.on("messageDialog2", (message: any) => addMessageState(message))           
     setValueInput("")      
  }
}

  const render = useCallback(async () => {
    try {     
     await connectSocket()
    } catch (e) {
      console.log(e)
    }
  }, [currentDialog])
  
  

  useEffect(() => {  
    console.log(1)   
   render()
    return () => {      
      socket.emit('end') 
    };
    
  }, [render])

  function addMessageState (message: any) { 
    console.log(message)  
    dispatch(getNewMessageInCurrentDialogAction(message))  
   
    let newArr = [...listMessage, message]    
    setListMessage(newArr)   
  } 
  
  function sendMessage(e: any) {
    e.preventDefault()
    const message = {
      idDialog: currentDialog._id,      
      authorLogin: user.login,
      authorId: user._id,
      message: valueInput
    }  
    socket.emit("messageDialog",message)    
    //  console.log(listMessage)    
    setValueInput("")
  }

  const handlerClickButton = (e: any) => {
    sendMessage(e)
  }

  const handlerChangeInput = (e: any) => {
    setValueInput(e.target.value)
  }

  return (
    <div className={WindowDialogCSS.dialogs_page__dialog_page__window_dialog}>
      <ul>
        {listMessage && listMessage.length > 0 &&
          listMessage.map((message: any, index: any) => (
            <div key={index}>
              <li>{`${message.authorLogin}: ${message.message}`}</li>
            </div>
          ))}
      </ul>
      <div
        className={
          WindowDialogCSS.dialogs_page__add_dialogs__block_button_input
        }
      >
        <button
          className={WindowDialogCSS.dialogs_page__add_dialogs_button}
          onClick={e => handlerClickButton(e)}
          disabled={currentDialog._id === undefined && true}
        >
          {currentDialog._id === undefined ? "Chose Dialog" : "Send Message"}
        </button>
        <input
          className={WindowDialogCSS.dialogs_page__add_dialogs_input}
          type="text"
          value={valueInput}
          onChange={e => handlerChangeInput(e)}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user,
  currentDialog: state.currentDialog.currentDialog,
  listMessagesForCurrentDialog: state.listMessagesForCurrentDialog.listMessagesForCurrentDialog
})

export default connect(mapStateToProps)(WindowDialog)

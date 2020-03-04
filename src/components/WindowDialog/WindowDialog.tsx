import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import { CurrentDialog } from "../../Redux/interfaces/currentDialog.interface"
import openSocket from "socket.io-client"
import WindowDialogCSS from './WindowDialog.module.css'
import ServiceMessage from "../../services/service-message"
// const socket = openSocket("http://localhost:8000")
const socket = openSocket("http://localhost:8000/dialogs")

type WindowDialogProps = {
    user: User
    dispatch: any 
    currentDialog: CurrentDialog
  }

const WindowDialog: React.FunctionComponent<WindowDialogProps> = ({user,
    dispatch,   currentDialog
}) => {
        const [listMessage, setListMessage]: any = useState([])
        const [valueInput, setValueInput]: any = useState("")

    socket.on("messageDialog", (message:any)=>addMessageState(message))

    const getMessagesFromBD = async () => {
        return await ServiceMessage.getAllMessagesByIdDialog(currentDialog._id)
    }

    useEffect(() => {
        if(currentDialog._id!==undefined) {
          const messagesFromBD = getMessagesFromBD()
          setListMessage(messagesFromBD)
          setValueInput('')
        }       
        }, [currentDialog])

    const addMessageState = (message: any) => {
        const newListMessage = [...listMessage, message]
        setListMessage(newListMessage)
        console.log(newListMessage)
      }

    function sendMessage(e: any) {
        e.preventDefault()
        socket.emit("messageDialog", {
          room: currentDialog._id,
          authorLogin: user.login,
          authorId: user._id,
          message: valueInput
        })
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
         <ul >
              {listMessage.length > 0 &&
                listMessage.map((message: any, index: any) => (
                  <div key={index} >
                    <li>{`${message.authorLogin}: ${message.message}`} </li>
                  </div>
                ))}
            </ul>
            <div className={WindowDialogCSS.dialogs_page__add_dialogs__block_button_input}>
            <button
              className={WindowDialogCSS.dialogs_page__add_dialogs_button}
              onClick={e => handlerClickButton(e)}
              disabled={currentDialog._id===undefined && true}
            >
              {currentDialog._id===undefined?"Chose Dialog":"Send Message"}
            </button >
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
    currentDialog: state.currentDialog.currentDialog
  })
  
  export default connect(mapStateToProps)(WindowDialog)


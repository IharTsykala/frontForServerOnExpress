import React, { useState, useEffect } from "react"
// import { subscribeToTimer } from "../../api"
import DialogsPageCSS from "./DialogsPage.module.css"
import DialogCard from '../../components/DialogCard/DialogCard'
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import ServiceDialog from "../../services/service-dialog"
import { LoadingState } from "../../shared/constants/user-from-view-mode.enum"
import openSocket from "socket.io-client"
// import ServiceDialog from "../../services/service-dialog"
// const dialogs = openSocket("http://localhost:8000")
const socket = openSocket("http://localhost:8000/dialogs")


type DialogsPageProps = {
  user: User
  dispatch: any
}

const DialogsPage: React.FunctionComponent<DialogsPageProps> = ({ user }) => {
  const [listDialogs, setListDialogs]: any = useState([])
  const [stateLoading, setStateLoading]: any = useState(LoadingState.loading)
  const [valueInput, setValueInput]: any = useState("")
  const [listMessage, setListMessage]: any = useState([])

  useEffect(() => {
    getListDialogs()
  }, [])

  async function getListDialogs() {
    try {
      const listForRender = await ServiceDialog.getAllDialogs()
      console.log(listForRender)
      if (listForRender) {
        setStateLoading(LoadingState.loaded)
        setListDialogs(listForRender)
      }
    } catch (e) {
      console.log(e)
      setStateLoading(LoadingState.loaded)
    }
  }

  const handlerClickButton = (e:any)=> {
    sendDialog(e)
    sendMessage(e)
  }

  async function sendDialog(e:any) {
    try {
      e.preventDefault() 
      const dialog = await ServiceDialog.addDialog({
        dialogName: 'new dialog ',
        members: [
          '5e500d3ba29fb20a943a79fe', '5e540356630b3c0704e1f3ce'
        ] 
      })
      // console.log(dialog)
    } catch(e) {
      console.log(e)
    }       
  }

  socket.on("messageDialog", (message:any)=>addMessageState(message))

  const addMessageState = (message:any)=> {
    const newListMessage = [...listMessage, message]
    setListMessage(newListMessage)
    console.log(newListMessage)
  }

  function sendMessage(e:any) {
    e.preventDefault()    
    socket.emit("messageDialog", {
      room: 'Hello',
      authorLogin: user.login,
      authorId: user._id,
      message: valueInput
    })
    setValueInput('')    
  }

  const handlerChangeInput = (e: any) => {
    setValueInput(e.target.value)
  }

  return (
    <>
      {stateLoading === "loading" && <h1>Ожидайте ответа</h1>}
      {stateLoading === "loaded" && (
        <div className={DialogsPageCSS.dialogs_page}>
          <section className={DialogsPageCSS.dialogs_page__rules_dialogs}>
            <ul
              className={
                DialogsPageCSS.dialogs_page__rules_dialogs__list_dialogs
              }
            >
              {listDialogs.length > 0 &&
                listDialogs.map((dialog: any) => (
                  <div
                    key={dialog._id}
                    className={
                      DialogsPageCSS.dialogs_page__rules_dialogs__list_dialogs__card
                    }
                  >
                    <li>{dialog.dialogName} </li>{" "}
                  </div>
                ))}
            </ul>
            <button
              className={DialogsPageCSS.dialogs_page__add_dialogs_button}
              onClick={(e) => handlerClickButton(e)}
            >
              Send Message
            </button>
          </section>
          <section
            className={DialogsPageCSS.dialogs_page__dialog_page__window_dialog}
          >
            <ul>
            {listMessage.length > 0 &&
                listMessage.map((message:any, index: any) => (
                  <div
                    key={index}                   
                    // className={
                    //   DialogsPageCSS.dialogs_page__rules_dialogs__list_dialogs__card
                    // }
                  >
                    <li>{message} </li>
                  </div>
                ))}
            </ul>
            
           <input type="text" value={valueInput} onChange={(e)=>handlerChangeInput(e)} />
          </section>
        </div>
      )}
      {stateLoading === "notFound" && <h1>not found</h1>}
      {stateLoading === "error" && <h1>ошибка</h1>}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.common.user
})

export default connect(mapStateToProps)(DialogsPage)

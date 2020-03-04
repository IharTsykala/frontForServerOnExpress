import React, { useState, useEffect } from "react"
import PanelDialogsCSS from './PanelDialogs.module.css'
import DialogCard from "../../components/DialogCard/DialogCard"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import ServiceDialog from "../../services/service-dialog"
import { LoadingState } from "../../shared/constants/user-from-view-mode.enum"
import { currentDialogAction } from "../../Redux/store/currentDialog/currentDialog.actions"

type PanelDialogsProps = {
    user: User
    dispatch: any
    allUsers: []
    // currentDialog: {} | undefined
  }

const PanelDialogs: React.FunctionComponent<PanelDialogsProps> =({user,dispatch, allUsers}) => {
    const [listDialogs, setListDialogs]: any = useState([])
    const [stateLoading, setStateLoading]: any = useState(LoadingState.loading)
    const [flagModalWindow, setFlagModalWindow]: any = useState(false)  
  
    useEffect(() => {
      getListDialogs()
    },[])
  
    async function getListDialogs() {
      try {
        const listForRender = await ServiceDialog.getAllDialogs()  
        console.log(listForRender)
        console.log(allUsers)
        if (listForRender) {
          setStateLoading(LoadingState.loaded)
          setListDialogs(listForRender)
        }
      } catch (e) {
        console.log(e)
        setStateLoading(LoadingState.loaded)
      }
    }
  
    const handlerClickButton = () => {
        setFlagModalWindow(!flagModalWindow)    
    }   
  
    async function sendDialog(e: any) {
      try {
        e.preventDefault()
        const dialog = await ServiceDialog.addDialog({
          dialogName: "new dialog ",
          members: ["5e500d3ba29fb20a943a79fe", "5e540356630b3c0704e1f3ce"]
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
            <section className={PanelDialogsCSS.dialogs_page__rules_dialogs}>

            <ul
              className={
                PanelDialogsCSS.dialogs_page__rules_dialogs__list_dialogs
              }
            >
              {(listDialogs.length>0 && !flagModalWindow &&
                listDialogs.map((dialog: any) => (
                  <DialogCard
                    key={dialog._id}                    
                    thisDialog={dialog}                    
                  />                 
                )))
                || (allUsers.length>0 && flagModalWindow &&
                    allUsers.map((user: any) => (
                      <DialogCard
                        key={user._id}                    
                        thisUser={user}                    
                      />                 
                    )))
                }
               
            </ul>
            <button
              className={PanelDialogsCSS.dialogs_page__add_dialogs_button}
              onClick={() => handlerClickButton()}
            >
              Add Dialog
            </button>
          </section>
        )  }
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


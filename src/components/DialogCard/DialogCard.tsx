import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { User } from "../../Redux/interfaces/user.interface"
import openSocket from "socket.io-client"
const socket = openSocket("http://localhost:8000/dialogs")

type DialogCardProps = {
    user: User
    dispatch: any
}

const DialogCard: React.FunctionComponent<DialogCardProps> = ()=> {
    // socket.on("messageDialog", (message:any)=>addMessageState(message))

    useEffect(()=>{
        
    })

    return (
        <>
           <li >
               
           </li> 
        </>
    )
}

const mapStateToProps = (state: any) => ({
    user: state.common.user
  })
  
  export default connect(mapStateToProps)(DialogCard)

//   className={
//     DialogsPageCSS.dialogs_page__rules_dialogs__list_dialogs__card
//   }
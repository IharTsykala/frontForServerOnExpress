import React, { useState, useEffect } from "react"

const CreateList = ({arr}: any) => {  
  // console.log(arr)
  // useEffect(()=>{console.log(props)},[1])  
  
  return (
    <ul>
      {arr.length > 0 &&
        arr.map((arr: any) => (
          <li key={arr._id}>
            <p>{`${arr.name} ${arr.description}`}</p>
          </li>
        ))}
      {!arr.length && <p>Your list is empty</p>}
    </ul>
  )
}

export default CreateList

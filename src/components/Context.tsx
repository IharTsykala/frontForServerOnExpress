import React, {createContext, useState} from "react"

interface AppContextInterface {
    userLogin: any,
    setUserLogin: ()=>{};
  }
  
  export const Context  = createContext<AppContextInterface|any>('');
  export const ContextProvider: React.FC = (props:any) => {
    const [userLogin, setUserLogin]: any = useState('');
    //in case refresh application
    if(userLogin) localStorage.setItem('login', userLogin)
    if(!userLogin && localStorage.getItem('login')) setUserLogin(localStorage.getItem('login'))
    
    return (
      <Context.Provider
        value = {{
          userLogin : userLogin,
          setUserLogin : setUserLogin
        }}
      >
        {props.children}
      </Context.Provider>
    );
  }
const axios = require("axios")

export default class Service {
    constructor() {}    

    static getAllUsers = async (setUsers, setLoad) => {
    try{
        const request = await axios.get("http://localhost:8080/users/")        
        const users = request.data
        setLoad('loaded')
        setUsers(users)              
    } catch(e) {
        console.log(e)        
    }
}

    static removeHandler = async (setLoad, id, history) => {        
    try{                           
        await axios.delete(`http://localhost:8080/users/delete/${id}`)                 
        history.go(`/users/all`)                                 
    } catch(e) {
        console.log(e)        
    }
}

    static editHandler = (e, user, history)=> {    
    e.preventDefault()    
    history.push(`/user/${user._id}`)
}

    static getUserByID = async (setUsers, setLoad, id) => {
    try{
        const request = await axios.get(`http://localhost:8080/users/${id}`)
        const user = request.data        
        const fildsUser = Object.entries(user).filter((fild)=> fild[0]==='role'||fild[0]==='name' ||
        fild[0]==='login' || fild[0]==='phone')        
        setLoad('loaded')
        setUsers(fildsUser)                   
    } catch(e) {
        console.log(e)        
    }
}

    static exitHandler = (e, history)=> {    
    e.preventDefault()    
    history.push(`/users/all`)
}
}
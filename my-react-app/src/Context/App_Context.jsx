import React, { createContext, useState } from 'react'


export const AppContext  = createContext(null);




export const AppContextProvider = (props) => {
   //  const API_base_url = "http://localhost:8000"
    const API_base_url = "http://127.0.0.1:7300/"
    const APP_NAME = 'MRSOFT SOFTWARE ENGINEERING TRAINING'

     const [ChartData, setChartData] = useState([]);
     const [newSupport, setNewSupport] = useState([]);
     const [newContactMessage, setNewContactMessage] = useState([]);
     const [newSupportCount, setNewSupportCount] = useState();
     const [newContactMessageCount, setNewContactMessageCount] = useState();

    const [ChartLabel, setChartLabel] = useState([]);
    const [ChartData1, setChartData1] = useState([]);
    const [ChartData2, setChartData2] = useState([]);
    const [ChartData3, setChartData3] = useState([]);
    const [ChartData4, setChartData4] = useState([]);

    const [pageTitle, setPageTitle] = useState('');

    const logout = () => { 
      localStorage.removeItem(`${API_base_url}token`)
      localStorage.removeItem(`${API_base_url}User.serialized`)
      console.log('logged out')
   }


    const StoreToken = (token) => { 
      localStorage.setItem(`${API_base_url}token`, token)
     return(token)
   }

   const StoreUserObj = (object) => {   
      localStorage.setItem(`${API_base_url}User.serialized`, JSON.stringify(object))
     return(object)
   }

    const getStoredToken = () => { 
       const token = localStorage.getItem(`${API_base_url}token`) 
      return(token)
    }

    const getStoredUserObj = () => {   
      const userObj = JSON.parse(localStorage.getItem(`${API_base_url}User.serialized`)) 
      return(userObj)
    }

    const userRole = () => {   
      const userObj = JSON.parse(localStorage.getItem(`${API_base_url}User.serialized`)) 
      return(userObj.role )
    }


    
    const profileImage = () => {   
      const userObj = JSON.parse(localStorage.getItem(`${API_base_url}User.serialized`)) 
      if(userObj && userObj.profileImg){
        return(userObj.profileImg.filePath)
      }
      return(undefined)
    }


    const isLoggedIn = () => {   
      const token = getStoredToken()
      const userObj = getStoredUserObj()
      let islogedin = false
      if(token === undefined || userObj === undefined || !token || !userObj ){ 
        logout() }
      else{ 
        islogedin = true
      }
      return(islogedin)
    }

    const handleAlreadyLoggedIn = () => {  
      const token = getStoredToken()
      const userObj = getStoredUserObj()
      
      
      if(token === undefined || userObj === undefined || !token || !userObj ){ logout() }
      else{ 
           let path = './'
                 if(userObj.role === 'super'){
                   path = `Admin`
                 }
                 else if(userObj.role === 'admin'){
                   path = `Admin`
                 }
                 else if(userObj.role === 'user'){
                  path = `User`
                }
                else{
                  path = `./`
                 }
          return (path)
         }
     } 

    
const contextValue = {API_base_url, handleAlreadyLoggedIn, getStoredToken, getStoredUserObj, userRole, ChartData, APP_NAME, ChartData1, ChartData2, ChartData3, ChartData4, ChartLabel, setChartData,
  setChartData1, setChartData2, setChartData3, setChartData4, setChartLabel, pageTitle, setPageTitle, profileImage, StoreToken, StoreUserObj, logout, isLoggedIn, newContactMessageCount, setNewContactMessageCount,
  newSupportCount, setNewSupportCount, newSupport, setNewSupport, newContactMessage, setNewContactMessage
}

  return (
    <AppContext.Provider value={ contextValue } >
        { props.children }
    </AppContext.Provider> 
  )
}
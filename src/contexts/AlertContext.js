import React, {useState, useReducer, useContext} from 'react'

const AlertContext = React.createContext()

export const useAlert = () =>{
  return useContext(AlertContext)
}

export const AlertProvider = ({ children }) => {
  const [visible, setAlert] = useState(false)

  const toggle = ()=>{
    setAlert((prey)=>{
      !prey
    })
  }
  return (
    <AlertContext.Provider value={{
      visible: visible,
      toggle
    }
      
    }>
      {children}
    </AlertContext.Provider>

  )
}

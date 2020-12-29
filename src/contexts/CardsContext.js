import React, { useContext } from "react";
import dbApp from "firebase";

const CardsContext = React.createContext();

export function useCards() {
  return useContext(CardsContext);
}

export default function CardsProvider({ children }) {
  
  function sendData(values) {
    const db = dbApp.database();
    
    db.ref().child("product").push(
      values,
      err => {
        if(err){
          console.log(err)
        }
      });
  }

  const value = {
    sendData,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}

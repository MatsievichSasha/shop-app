import React, { useContext } from "react";
import dbApp from "firebase";

const CardsContext = React.createContext();

export function useCards() {
  return useContext(CardsContext);
}

export default function CardsProvider({ children }) {
  
  function sendData() {
    const db = dbApp.database();
    db.ref("product").push(value);
  }

  const value = {
    sendData,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}

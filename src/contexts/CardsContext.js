import React, { useContext, useState, useEffect } from "react";
import dbApp from "firebase";

const CardsContext = React.createContext();

export function useCards() {
  return useContext(CardsContext);
}

export default function CardsProvider({ children }) {
  const [prodactObjects, setProdactObjects] = useState({});
  const db = dbApp.database();

  useEffect(() => {
    db.ref()
      .child("product")
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          setProdactObjects({
            ...snapshot.val(),
          });
        }
      });
  }, []);

  console.log(JSON.stringify(prodactObjects));

  function sendData(values) {
    db.ref()
      .child("product")
      .push(values, (err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  function removeCard(params) {
    
  }

  const value = {
    sendData,
    prodactObjects,
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}

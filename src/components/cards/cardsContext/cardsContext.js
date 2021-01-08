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

  function sendData(values) {
    db.ref()
      .child("product")
      .push(values, (err) => {
        if (err) {
          console.log(err);
        }
      });
  }

  function removeCard(key) {
    db.ref("product" + '/' + key).remove()
  }

  function setCardFB(object, key) {
    db.ref("product" + '/' + key).update(object)
  }

  const value = {
    sendData,
    prodactObjects,
    removeCard,
    setCardFB
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}

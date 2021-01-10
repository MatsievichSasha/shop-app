import React, { useContext, useState, useEffect, useReducer } from "react";
import dbApp from "firebase";
import { cardsReduser, ACTIONS } from '../../cards/cardsContext/cardsReduser'

const CardsContext = React.createContext();

export function useCards() {
  return useContext(CardsContext);
}

export default function CardsProvider({ children }) {

  const initialFieldValues = {
    name: { value: "", touched: false, hasError: true, error: "" },
    file_img: { value: "", touched: false, hasError: true, error: "" },
    description: { value: "", touched: false, hasError: false, error: "" },
    price: { value: "", touched: false, hasError: true, error: "" },
    discount: { value: "", touched: false, hasError: false, error: "" },
    discountDateEnd: { value: "", touched: false, hasError: false, error: "" },
    isFormValid: false,
  };

  const [formState, dispatch] = useReducer(cardsReduser, initialFieldValues)

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

  function sendData(object) {
    db.ref()
      .child("product")
      .push(object, (err) => {
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
    initialFieldValues,
    formState,
    dispatch,
    sendData,
    prodactObjects,
    removeCard,
    setCardFB
  };

  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
}

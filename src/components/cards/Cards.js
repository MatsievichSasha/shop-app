import React from "react";
import Card from "./Card";
import { useCards } from "../cards/cardsContext/cardsContext";


let styles = {
  ul: {
    padding: "41px",
  },
};

export default function Cards() {
  const { prodactObjects } = useCards();

  return (
    <>
      <div className="container">
        <div className="row row-container">
          {Object.keys(prodactObjects).map((id) => {
            return <Card
              object={prodactObjects[id]}
              key={id}
              id={id}>
            </Card>;
          })}
        </div>
      </div>

    </>
  );
}

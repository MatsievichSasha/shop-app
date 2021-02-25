import React from "react";
import Card from "./Card";
import { useCards } from "../cards/cardsContext/cardsContext";


let styles = {
  ul: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
};

export default function Cards() {
  const { prodactObjects } = useCards();

  return (
    <>
      <ul style={styles.ul}>
        {Object.keys(prodactObjects).map((id) => {
          return <Card
            object={prodactObjects[id]}
            key={id}
            id={id}>
          </Card>;
        })}
      </ul>
    </>
  );
}

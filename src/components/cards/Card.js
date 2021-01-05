import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../../contexts/CardsContext";
import { Link } from "react-router-dom";

let styles = {
  li: {
    width: "250px",
    listStyleType: "none",
  },

  wrapper: {
    padding: "0.5rem",
  },

  img: {
    width: "100%",
    height: "160px",
    objectFit: "contein",
    display: "block",
    objectPosition: "50% 0",
  },

  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  prices: {
    height: "55px",
  },

  price_old: {
    height: "18px",
    fontSize: "14px",
    color: "#a6a5a5",
    textDecoration: "line-through",
  },

  price_current: {
    display: "flex",
    justifyContent: "space-between",
    color: "rgb(121, 187, 23)",
  },

  price_current_value: {
    color: "#f84147",
  },
};

export default function Card({ object, id }) {
  const { removeCard } = useCards();
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountDateEnd, setDiscountDateEnd] = useState("");

  function handelRemove() {
    return removeCard(id);
  }

  useEffect(() => {
    priceCreat(object);
  }, []);

  function priceCreat(object) {
    let msInDay = 86400000;
    if (object.discount) {
      let now = new Date();
      let discountDateEnd = new Date(object.discountDateEnd);

      if (discountDateEnd > now) {
        setDiscountDateEnd(Math.round((discountDateEnd - now) / msInDay));
        setDiscountPrice(object.price - (object.price * object.discount) / 100);
      }
    }
  }

  return (
    <li className="card" style={styles.li}>
      <article style={styles.wrapper} className="wrapper">
        <a className="img__container">
          <img style={styles.img} src={object.urlImg} alt="" />
        </a>
        <div className="name">{object.name}</div>
        <div styles={styles.prices}>
          <div style={styles.price_old} className="price_old">
            {discountPrice ? `${object.price}$` : null}
          </div>
          <div style={styles.price_current} className="price_current">
            <span
              style={styles.price_current_value}
              className="price_current_value"
            >
              {discountPrice ? `${discountPrice}$` : `${object.price}$`}
            </span>
            <span className="price_valid"></span>
            {discountDateEnd ? `Цена действительна ${discountDateEnd}д.` : null}
          </div>
        </div>
        <div style={styles.description} className="description">
          {object.description}
        </div>
      </article>
      <ul className="edit list-inline m-0">
        <li className="list-inline-item">
          <Link
            to={{
              pathname: "/edit-Card",
              object: object,
              id: id,
            }}
            className="btn btn-success btn-sm rounded-0"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </li>
        <li className="list-inline-item">
          <button
            className="btn btn-danger btn-sm rounded-0"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <FontAwesomeIcon onClick={handelRemove} icon={faTrash} />
          </button>
        </li>
      </ul>
    </li>
  );
}

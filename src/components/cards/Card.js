import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../cards/cardsContext/cardsContext";
import { Link } from "react-router-dom";
import { ACTIONS } from '../cards/cardsContext/cardsReduser';
import ModaleDelete from "./ModalDelete";


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

  discountText: {
    fontSize: "10px",
    color: "#2e796c",
  }
};

export default function Card({ object, id }) {
  const { removeCard, dispatch } = useCards();
  const [discountPrice, setDiscountPrice] = useState("");
  const [discountDateEnd, setDiscountDateEnd] = useState("");
  const [showModalDelete, setshowModalDelete] = useState(false);

  const handleCloseModal = () => setshowModalDelete(false);
  const handleShowModal = () => setshowModalDelete(true);



  useEffect(() => {
    priceCreat(object);
  });

  function priceCreat(object) {
    let msInDay = 86400000;
    if (object.discount) {
      let now = new Date();
      let discountDateEnd = new Date(object.discountDateEnd);

      if (discountDateEnd > now) {
        setDiscountDateEnd(Math.round((discountDateEnd - now) / msInDay));
        setDiscountPrice(
          Math.floor(object.price * 100 - object.price * object.discount) / 100
        );
      }
    }
  }

  const handelEdit = () => {
    dispatch({ type: ACTIONS.EDIT_CARD, payload: object })
  }

  function handelRemove() {
    return removeCard(id);
  }

  return (
    <li className="card" style={styles.li}>
      <article style={styles.wrapper} className="wrapper">
        <a className="img__container">
          <img style={styles.img} src={object.file_img} alt={object.name} />
        </a>
        <div className="name">{object.name}</div>
        <div styles={styles.prices}>
          <div style={styles.price_old} className="price_old">
            {discountPrice ? `${object.price}$` : null}
          </div>
          <div style={styles.price_current} className="price_current">
            <span
              style={styles.price_current_value}
              className="discountText"
            >
              {discountPrice ? `${discountPrice}$` : `${object.price}$`}
            </span>
            {discountDateEnd ? <span><span className="discountText" style={styles.discountText}>До конца акции</span> <span>{discountDateEnd}</span > <span className="discountText" style={styles.discountText}>дней</span></span> : null}
          </div>
        </div>
        <div style={styles.description} className="description">
          {object.description}
        </div>
      </article>
      <ul className="edit list-inline m-0">
        <li className="list-inline-item">
          <Link
            onClick={handelEdit}
            to={{
              pathname: "/edit-card",
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
            onClick={handleShowModal}
            className="btn btn-danger btn-sm rounded-0"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </li>
        <ModaleDelete />
      </ul>
    </li>
  );
}

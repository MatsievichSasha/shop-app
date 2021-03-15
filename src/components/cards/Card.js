import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCards } from "../cards/cardsContext/cardsContext";
import { Link } from "react-router-dom";
import { ACTIONS } from '../cards/cardsContext/cardsReduser';
import ModalDelete from "./ModalDelete";


let styles = {
  li: {
    width: "250px",
    listStyleType: "none",
  },

  price_old: {
    height: "18px",
    fontSize: "14px",
    color: "#a6a5a5",
    textDecoration: "line-through",
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
  const [showModalDelete, setShowModalDelete] = useState(false);

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

  return (
    <div className="card col-12 col-sm-6 col-md-4 col-lg-3">
      <a className="card-a-image">
        <img className="card-img-top card-img-size" src={object.file_img} alt={object.name} />
      </a>
      <div className="card-body card-body-size">
        <div className="card-title-wrapper">
          <h5 className="card-title ">{object.name}</h5>
        </div>
        <div className="row price justify-content-between">
          <div className="d-flex flex-column align-self-baseline">
            <div className="" style={styles.price_old} stile={{ height: '1rem' }}>
              <span>{discountPrice ? `${object.price}$` : null}</span>
            </div>
            <div className="">
              <span>{discountPrice ? `${discountPrice}$` : `${object.price}$`}</span>
            </div>
          </div>
          {discountDateEnd ?
            <div className="d-flex flex-column align-self-baseline">
              <div className="" style={styles.price_current} className="price_current">
                <span className="discountText" style={styles.discountText}>До конца акции</span>
              </div>
              <div className="">
                <span className="badge bg-warning text-dark">{discountDateEnd}</span > <span className="discountText" style={styles.discountText}>дней</span>
              </div>
            </div>
            : null}
        </div>
        <p className="description" style={styles.description}>
          {object.description}
        </p>
      </div>



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
            onClick={() => setShowModalDelete(true)}
            className="btn btn-danger btn-sm rounded-0"
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </li>
        <ModalDelete show={showModalDelete} setShow={setShowModalDelete} remove={removeCard} id={id} />
      </ul>
    </div>
  );
}

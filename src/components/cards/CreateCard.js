import React, { useEffect, useRef, useState, useReducer } from "react";
import { useCards } from "../cards/cardsContext/cardsContext"
import dbApp from "firebase";
import Alert from "../Alert";
import { useHistory } from "react-router-dom";
import { cardsReduser, ACTIONS } from '../cards/cardsContext/cardsReduser'
import { onInputChange } from '../../lib/formUtils'

export default function CreateCard() {

  const initialFieldValues = {
    name: { value: "", touched: false, hasError: true, error: "" },
    /*     urlImg: "",
        description: "",
        price: "",
        discount: "",
        discountDateEnd: "", */
    isFormValid: false,
  };

  const [formState, dispatch] = useReducer(cardsReduser, initialFieldValues)

  const handleInputChange = (e) => {
    onInputChange("name", e.target.value, dispatch, formState);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  /*   const formErrors = {
      name: "Поле не может быть пустым",
      urlImg: "Поле не может быть пустым",
      description: "",
      price: "Поле не может быть пустым",
      discount: "",
      discountDateEnd: "",
    }; */
  /*  const [name, setValue] = useState(initialFieldValues); */

  /*   const history = useHistory(); */

  //for validation
  /*   const [error, setError] = useState("");
    const [nameDirty, setNameDirty] = useState(false);
    const [descriptionDirty, setDescriptionDirty] = useState(false);
    const [priceDirty, setPriceDirty] = useState(false);
    const [discountDirty, setDiscountDirty] = useState(false);
    const [inputErrors, setInputErrors] = useState(formErrors);
    const [formValid, setFormValid] = useState(false);
  
    const { sendData } = useCards();
  
    const [hasImage, setHasImage] = useState(false);
    const refImageInput = useRef();
    const ImageMaxSize = 4000;
    const ImageMinSize = 200; */

  /*   useEffect(() => {
      if (inputErrors.name || inputErrors.price || inputErrors.discountDateEnd) {
        setFormValid(false);
      } else {
        setFormValid(true);
      }
    }, [inputErrors]); */

  /*   function handleInputChange(e) {
  
    } */

  /*   function blurHandleValidation(e) {
      switch (e.target.name) {
        case "name":
          setNameDirty(true);
          break;
        case "description":
          setDescriptionDirty(true);
          break;
        case "price":
          setPriceDirty(true);
          break;
        case "discount":
          setDiscountDirty(true);
          if (e.target.value) {
            setInputErrors({
              ...inputErrors,
              discountDateEnd: "При наличии скидки - указать дату",
            });
          }
      }
    } */

  /*   function onFileChange(e) {
      setError("");
      setHasImage(false);
      e.preventDefault();
      const file = e.target.files[0];
  
      let fileTypes = ["image/jpeg", "image/pjpeg", "image/png", "image/jpg"];
  
      function validFileType(file) {
        for (var i = 0; i < fileTypes.length; i++) {
          if (file.type === fileTypes[i]) {
            return true;
          }
        }
        return false;
      }
  
      if (validFileType(file)) {
        let img = new Image();
        img.onload = () => {
          var h = img.height;
          var w = img.width;
          if (
            w < ImageMinSize ||
            h < ImageMinSize ||
            w > ImageMaxSize ||
            h > ImageMaxSize
          ) {
            e.target.value = "";
            setHasImage(false);
            setError(
              "Sorry, this image does not match the size or type we wanted. Choose another file."
            );
          } else {
            setHasImage(true);
            setError("");
          }
        };
        img.src = window.URL.createObjectURL(e.target.files[0]);
      } else {
        e.target.value = "";
        setError(
          "Sorry, this image does not match the size or type we wanted. Choose another file."
        );
      }
    } */

  /*   useEffect(() => {
      if (hasImage) {
        const file = refImageInput.current.files[0];
        const storageRef = dbApp.storage().ref();
        const fileRef = storageRef.child(`images/${file.name}`).put(file); //create ref for file
  
        fileRef.on(
          "state_changed",
          function (snapshot) {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          function (error) {
            console.log(error);
          },
          function () {
            fileRef.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              setValue({
                ...values,
                urlImg: downloadURL,
              });
            });
          }
        );
      }
    }, [hasImage]); */

  /*    function handleFormSubmit(e) {
      e.preventDefault();
      addCard()
       try {
        await sendData(values);
        history.push("/");
      } catch {
        setError("Failed to log in");
      } 
    } */

  return (
    <>
      <div className="container">
        <section className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Добавление товара</h3>
          </div>
          <div className="panel-body">
            <form
              onSubmit={handleFormSubmit}
              className="form-horizontal"
              role="form"
            >
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3 control-label">
                  Заголовок
                </label>
                <div className="col-sm-9">
                  {/*                   {nameDirty && inputErrors.name && (
                    <div style={{ color: "red" }}>{inputErrors.name}</div>
                  )} */}
                  <input
                    /*                     onBlur={blurHandleValidation} */
                    onChange={handleInputChange}
                    value={formState.name.value}
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Название товара"
                    required
                    minLength="20"
                    maxLength="60"
                    autoComplete="off"
                  />
                </div>
              </div>
              {/*             <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="file_img">
                  Изображение (min 200px*200px, max 4000px*4000px, .jpg, .jpeg,
                  .png):
                </label>
                <input
                  onChange={onFileChange}
                  ref={refImageInput}
                  type="file"
                  id="file_img"
                  name="file_img"
                  required
                  accept=".jpg, .jpeg, .png"
                  multiple
                />
              </div>
              {error && (
                <Alert
                  value={{
                    text: error,
                    type: "danger",
                  }}
                ></Alert>
              )}
              {hasImage && (
                <div>
                  <img
                    src={values.urlImg}
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="description" className="col-sm-3 control-label">
                  Описание
                </label>
                <div className="col-sm-9">
                  {descriptionDirty && inputErrors.description && (
                    <div style={{ color: "red" }}>
                      {inputErrors.description}
                    </div>
                  )}
                  <textarea
                    value={values.description}
                    onBlur={blurHandleValidation}
                    onChange={handleInputChange}
                    id="description"
                    name="description"
                    className="form-control"
                    maxLength="200"
                    autoComplete="off"
                  ></textarea>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="price" className="col-sm-3 control-label">
                  Цена, $
                </label>
                <div className="col-sm-3">
                  {priceDirty && inputErrors.price && (
                    <div style={{ color: "red" }}>{inputErrors.price}</div>
                  )}
                  <input
                    value={values.price}
                    onBlur={blurHandleValidation}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    name="price"
                    id="price"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="discount" className="col-sm-3 control-label">
                  Процент скидки, %
                </label>
                <div className="col-sm-3">
                  {discountDirty && inputErrors.discount && (
                    <div style={{ color: "red" }}>{inputErrors.discount}</div>
                  )}
                  <input
                    value={values.discount}
                    onBlur={blurHandleValidation}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    name="discount"
                    id="discount"
                    placeholder="от 10% до 90%"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-sm-3 control-label"
                  htmlFor="discountDateEnd"
                >
                  Дата окончания скидки:
                </label>
                <div className="col-sm-3">
                  {inputErrors.discountDateEnd && (
                    <div style={{ color: "red" }}>
                      {inputErrors.discountDateEnd}
                    </div>
                  )}
                  <input
                    onChange={handleInputChange}
                    onBlur={blurHandleValidation}
                    type="date"
                    className="form-control"
                    name="discountDateEnd"
                    id="discountDateEnd"
                    placeholder="dd.mm.yyyy"
                    autoComplete="off"
                  />
                </div> 
              </div>*/}
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  <button
                    /*  disabled={!formValid} */
                    type="submit"
                    className="btn btn-primary"
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

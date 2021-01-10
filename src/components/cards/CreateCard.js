import React, { useEffect, useRef, useState, useReducer } from "react";
import { useCards } from "../cards/cardsContext/cardsContext"
import dbApp from "firebase";
import Alert from "../Alert";
import { useHistory } from "react-router-dom";
import { cardsReduser, ACTIONS } from '../cards/cardsContext/cardsReduser'
import { onInputChange, onInputBlur, validateInput } from '../../lib/formUtils'

export default function CreateCard() {

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
  const [showError, setShowError] = useState("")
  const [showSuccess, setShowSuccess] = useState("")
  const { sendData } = useCards();
  const history = useHistory();
  ////
  const [hasImage, setHasImage] = useState(false);
  const refImageInput = useRef();
  const ImageMaxSize = 4000;
  const ImageMinSize = 200;
  ////

  const handleInputChange = (e) => {
    onInputChange(e.target.name, e.target.value, dispatch, formState);
  }

  const handleInputBlur = (e) => {
    onInputBlur(e.target.name, e.target.value, dispatch, formState);
  }

  const handleInputFocus = (e) => {
    if (e.target.tagName === "INPUT") {
      if (showSuccess) {
        setShowSuccess("");
      }
    }
  }
  async function handleFormSubmit(e) {
    let { name: { value: name },
      description: { value: description },
      price: { value: price },
      discount: { value: discount },
      discountDateEnd: { value: discountDateEnd },
    } = formState
    e.preventDefault();
    let isFormValid = true
    for (const name in formState) {
      const item = formState[name]
      const { value } = item
      const { hasError, error } = validateInput(name, value)
      if (hasError) {
        isFormValid = false
      }
      if (name) {
        dispatch({
          type: ACTIONS.CHANGE_FIELD,
          payload: {
            name,
            value,
            hasError,
            error,
            touched: true,
            isFormValid,
          },
        })
      }
    }

    if (!isFormValid) {
      setShowError("Пожалуйста заполните все поля корректно")
    } else {
      try {
        await sendData({ name, description, price, discount, discountDateEnd });
        setShowSuccess("Товар успешно добавлен")
        dispatch({ type: ACTIONS.RESET, payload: initialFieldValues })
        /* history.push("/"); */
      } catch {
        setShowError("Произошла ошибка при отправке");
      }
    }
    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError("")
    }, 5000)
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
  
 */

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
       try {
        await sendData(values);
        history.push("/");
      } catch {
        setError("Failed to log in");
      }
    } */
  console.log(showSuccess)
  return (
    <>
      <div className="container">
        <section className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title col-sm-9" style={{ textAlign: "center" }}>Добавление товара</h3>
            {showError && !formState.isFormValid && (
              <div className="form_error">{showError}</div>)}
            {showSuccess && (
              <div className="form_success">{showSuccess}</div>)}
          </div>
          <div className="panel-body">
            <form
              onSubmit={handleFormSubmit}
              onFocus={handleInputFocus}
              className="form-horizontal"
              role="form"
            >
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3 control-label">
                  Заголовок
                </label>
                <div className="col-sm-9">
                  {formState.name.touched && formState.name.hasError && (
                    <div className="error">{formState.name.error}</div>
                  )}
                  <input
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={formState.name.value}
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Название товара"
                    /* required */
                    minLength="20"
                    maxLength="60"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-9" htmlFor="file_img">
                  Изображение (min 200px, max 4000px, .jpg, .jpeg,.png):
                </label>
                <div className="col-sm-9">
                  <input
                    onChange={handleInputChange}
                    ref={refImageInput}
                    type="file"
                    id="file_img"
                    name="file_img"
                    /* required */
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
              </div>
              {/*  {formState.urlImg.hasError && (
                <div className="error">{formState.urlImg.error}</div>
              )}
              {hasImage && (
                <div>
                  <img
                    src={formState.urlImg.values}
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
              )} */}
              <div className="form-group">
                <label htmlFor="description" className="col-sm-3 control-label">
                  Описание
                </label>
                <div className="col-sm-9">
                  {formState.description.touched && formState.description.hasError && (
                    <div className="error">{formState.description.error}</div>
                  )}
                  <textarea
                    value={formState.description.value}
                    onBlur={handleInputBlur}
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
                <div className="col-sm-9">
                  {formState.price.touched && formState.price.hasError && (
                    <div className="error">{formState.price.error}</div>
                  )}
                  <input
                    value={formState.price.value}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    /* required */
                    autoComplete="off"
                    step="0.01"
                    min="0.01"
                    max="99999999.99"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="discount" className="col-sm-3 control-label">
                  Процент скидки, %
                </label>
                <div className="col-sm-9">
                  {formState.discount.touched && formState.discount.value && (
                    <div className="error">{formState.discount.error}</div>
                  )}
                  <input
                    value={formState.discount.value}
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    type="number"
                    className="form-control"
                    name="discount"
                    id="discount"
                    placeholder="от 10% до 90%"
                    autoComplete="off"
                    step="1"
                    min="10"
                    max="90"
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
                <div className="col-sm-9">
                  {formState.discountDateEnd.error && (
                    <div className="error">
                      {formState.discountDateEnd.error}
                    </div>
                  )}
                  <input
                    value={formState.discountDateEnd.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    type="date"
                    className="form-control"
                    name="discountDateEnd"
                    id="discountDateEnd"
                    placeholder="dd.mm.yyyy"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  <button
                    /* disabled={!formState.isFormValid} */
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

import React, { useRef, useState } from "react";
import { useCards } from "../../contexts/CardsContext";
import dbApp from "firebase";
import Alert from "../Alert";
import { useHistory } from 'react-router-dom'
import { checkImage } from '../checkForm'

export default function CreateCard() {
  const initialFieldValues = {
    name: "",
    urlImg: "",
    description: "",
    price: "",
    discount: "",
    discountDateEnd: "",
  };

  const [values, setValue] = useState(initialFieldValues);
  const [hasImage, setHasImage] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory()
  const { sendData } = useCards();

  function handleInputChange({ target: { name, value } }) {
    setValue({
      ...values,
      [name]: value,
    });
  }

  function onFileChange(e) {
    setError("")
    setHasImage(false);
    e.preventDefault();
    const file = e.target.files[0];
    if (checkImage(file)) {
      const storageRef = dbApp.storage().ref();
      const fileRef = storageRef.child(`images/${file.name}`).put(file); //create ref for file

      fileRef.on(
        "state_changed",
        function (snapshot) {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            setHasImage(true);
          });
        }
      );
    } else {
      e.target.value = ""
      setError("Sorry, this image does not match the size or type we wanted. Choose another file.")
    }

  }



  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      await sendData(values);
      history.push('/')
    } catch {
      setError('Failed to log in')
    }

  }

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
                  <input
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Название товара"
                    required
                    minlength="20" maxlength="60"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="file_img">
                  Изображение (min 200px*200px, max 4000px*4000px, .jpg, .jpeg, .png):
                </label>
                <input
                  onChange={onFileChange}
                  type="file"
                  id="file_img"
                  name="file_img"
                  required
                  accept=".jpg, .jpeg, .png"
                  multiple
                />
              </div>
              {error && <Alert value={
                {
                  text: error,
                  type: 'danger'
                }
              }></Alert>}
              {hasImage && (
                <div>
                  <img src={values.urlImg} />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="description" className="col-sm-3 control-label">
                  Описание
                </label>
                <div className="col-sm-9">
                  <textarea
                    onChange={handleInputChange}
                    id="description"
                    name="description"
                    className="form-control"
                    maxlength="200"
                  ></textarea>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="price" className="col-sm-3 control-label">
                  Цена, $
                </label>
                <div className="col-sm-3">
                  <input
                    onChange={handleInputChange}
                    type="number"
                    min="0" max="99999999.99"
                    className="form-control"
                    name="price"
                    id="price"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="discount" className="col-sm-3 control-label">
                  Процент скидки, %
                </label>
                <div className="col-sm-3">
                  <input
                    onChange={handleInputChange}
                    type="number"
                    min="0" max="90"
                    className="form-control"
                    name="discount"
                    id="discount"
                    placeholder="от 10% до 90%"
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
                  <input
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    name="discountDateEnd"
                    id="discountDateEnd"
                    placeholder="dd.mm.yyyy"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-primary">
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

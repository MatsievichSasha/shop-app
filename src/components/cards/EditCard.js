import React, { useRef, useState, useEffect } from "react";
import { useCards } from "../../contexts/CardsContext";
import dbApp from "firebase";
import Alert from "../Alert";
import { useHistory } from 'react-router-dom'

export default function EditCard(props) {
  /*  console.log(props.location.id, props.location.object) */

  /*   const initialFieldValues = {
      name: "",
      urlImg: "",
      description: "",
      price: "",
      discount: "",
      discountDateEnd: "",
    }; */

  const history = useHistory()
  console.log(props.location.object)
  if (props.location.object === undefined) {
    history.push('/')
  }

  /*   if (true) {
      history.push('/')
    } */
  const [values, setValue] = useState(props.location.object);

  const [hasImage, setHasImage] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const image = useRef(values.urlImg)
  
  const {setCardFB} = useCards()

  useEffect(() => {
    if (image) {
      setHasImage(true);
    }
  })


  function handleInputChange({ target: { name, value } }) {
    setValue({
      ...values,
      [name]: value,
    });
  }

  function onFileChange(e) {
    setHasImage(false);
    e.preventDefault();
    const file = e.target.files[0];
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
  }

    async function handleFormSubmit(e) {
      e.preventDefault();
      try{
        await setCardFB(values, props.location.id)
        history.push('/')
      } catch{
        setError('Failed to log in')
      }
    }

  return (
    <>
      <div className="container">
        <section className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Добавление/Редактирование товара</h3>
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
                    value={values.name}
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Название товара"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="file_img">
                  Изображение (jpg):
                </label>
                <input
                  onChange={onFileChange}
                  type="file"
                  id="file_img"
                  name="file_img"
                />
              </div>
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
                    value={values.description}
                    id="description"
                    name="description"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="price" className="col-sm-3 control-label">
                  Цена
                </label>
                <div className="col-sm-3">
                  <input
                    onChange={handleInputChange}
                    value={values.price}
                    type="text"
                    className="form-control"
                    name="price"
                    id="price"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="discount" className="col-sm-3 control-label">
                  Процент скидки
                </label>
                <div className="col-sm-3">
                  <input
                    onChange={handleInputChange}
                    value={values.discount}
                    type="text"
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
                    value={values.discountDateEnd}
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

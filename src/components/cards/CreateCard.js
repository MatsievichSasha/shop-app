import React, { useRef, useState } from "react";
import { useCards } from "../../contexts/CardsContext";
import dbApp from 'firebase'

export default function CreateCard() {
  const descriptionRef = useRef();

  const initialFieldValues = {
    name: "",
    urlImg: "",
    description: "",
    price: "",
    discount: "",
    discountDateEnd: "",
  };

  const [hasImage, setHasImage] = useState(false)

  const [values, setValue] = useState(initialFieldValues);
  console.log(values);

  function handleInputChange({ target: { name, value } }) {
    setValue({
      ...values,
      [name]: value,
    });
  }

  async function onFileChange(e){
    e.preventDefault();
    const file = e.target.files[0]
    const storageRef = dbApp.storage().ref()
    const fileRef = storageRef.child(file.name) //create ref for file
    await fileRef.put(file)
      .then(()=>console.log('Uploaded file'))
      setValue({
        ...values,
        urlImg: await fileRef.getDownloadURL(),
      }); 
      setHasImage(prev=>!prev)
      
  }

  const { sendData } = useCards();

  function handleFormSubmit(e) {
    e.preventDefault();
    sendData(values);
  }
  console.log(JSON.stringify(values));
  return (
    <div className="container">
      <button type="button" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
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
            { hasImage && <div><img src={values.urlImg}/></div>
            }
            <div className="form-group">
              <label htmlFor="description" className="col-sm-3 control-label">
                Описание
              </label>
              <div className="col-sm-9">
                <textarea
                  onChange={handleInputChange}
                  ref={descriptionRef}
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
      <p>{JSON.stringify(values)}</p>
    </div>
  );
}

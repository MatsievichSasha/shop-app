import React, { useRef, useState } from "react";
import { useCards } from "../../contexts/CardsContext";

export default function CreateCard() {
  const descriptionRef = useRef();

  const initialFieldValues = {
    name: "",
    image: "",
    description: "",
    price: "",
    discount: "",
    discountDateEnd: "",
  };

  const [values, setValue] = useState(initialFieldValues);
  console.log(values);

  function handleInputChange({ target: { name, value } }) {
    setValue({
      ...values,
      [name]: value,
    });
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
                Картинка (jpg/png):
              </label>
              <input type="file" id="file_img" name="file_img" />
            </div>
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
              <label className="col-sm-3 control-label" htmlFor="discountDateEnd">
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

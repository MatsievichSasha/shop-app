import React, { useRef, useState } from "react";
import { useCards } from "../../contexts/CardsContext";

export default function CreateCard() {
  
  const descriptionRef = useRef();

  const initialFieldValues = {
    name: '',
    image: '',
    description: '',
    price: '',
    discount: '',
    discountDateEnd: ''
  }

  const [value, setValue] = useState(initialFieldValues)
  
  function handleInputChange(e) {
    
  }

  const { sendData } = useCards()

  function handleSubmit(e) {
    e.preventDefault();
    sendData()
  }

  return (
    <div class="container">
      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <section class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Добавление/Редактирование товара</h3>
        </div>
        <div class="panel-body">
          <form onSubmit={sendData} class="form-horizontal" role="form">
            <div class="form-group">
              <label for="name" class="col-sm-3 control-label">
                Заголовок
              </label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  id="name"
                  placeholder="Название товара"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="download" class="col-sm-3 control-label">
                Загрузить
              </label>
              <div class="col-sm-3">
                <label class="control-label small" for="file_img">
                  Картинка (jpg/png):
                </label>{" "}
                <input type="file" name="file_img" />
              </div>
            </div>

            <div class="form-group">
              <label for="about" class="col-sm-3 control-label">
                Описание
              </label>
              <div class="col-sm-9">
                <textarea ref={descriptionRef} class="form-control"></textarea>
              </div>
            </div>
            <div class="form-group">
              <label for="price" class="col-sm-3 control-label">
                Цена
              </label>
              <div class="col-sm-3">
                <input
                  type="text"
                  class="form-control"
                  name="price"
                  id="price"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="discount" class="col-sm-3 control-label">
                Процент скидки
              </label>
              <div class="col-sm-3">
                <input
                  type="text"
                  class="form-control"
                  name="discount"
                  id="discount"
                  placeholder="от 10% до 90%"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label" for="date_end">
                Дата окончания скидки:
              </label>
              <div class="col-sm-3">
                <input
                  type="text"
                  class="form-control"
                  name="date_end"
                  id="date_end"
                  placeholder="dd.mm.yyyy"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-9">
                <button type="submit" class="btn btn-primary">
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

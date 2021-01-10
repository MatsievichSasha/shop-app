import { ACTIONS } from '../components/cards/cardsContext/cardsReduser'
import { imageSize } from "./getImageSize"

export const onInputChange = (name, value, dispatch, formState) => {

  const { hasError, error } = validateInput(name, value)

  let isFormValid = true

  for (const key in formState) {
    const item = formState[key]
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = false
      break
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = false
      break
    }
  }
  dispatch({
    type: ACTIONS.CHANGE_FIELD,
    payload: {
      name,
      value,
      hasError,
      error,
      touched: false,
      isFormValid,
    }
  })
}

export const onInputBlur = (name, value, dispatch, formState) => {
  const { hasError, error } = validateInput(name, value);
  let isFormValid = true
  if (name === "discount") {
    if (formState.discount.value && !formState.discountDateEnd.value) {
      formState.discountDateEnd.error = "При наличии скидки - указать дату"
    } else {
      formState.discountDateEnd.error = ""
    }
  }

  for (const key in formState) {
    const item = formState[key]
    if (key === name && hasError) {
      isFormValid = false
      break
    } else if (key !== name && item.hasError) {
      isFormValid = false
      break
    }
  }
  dispatch({
    type: ACTIONS.CHANGE_FIELD,
    payload: { name, value, hasError, error, touched: true, isFormValid },
  })
}

export const validateInput = (name, value, file) => {
  let hasError = false;
  let error = "";
  switch (name) {
    case "name":
      if (value.trim() === "") {
        hasError = true;
        error = "Поле не может быть пустым"

      } else if (value.length < 20 || value.length > 60) {
        hasError = true
        error = "минимум 20, максимум 60 символов"
      } else {
        error = ""
      }
      break;

    case "description":
      if (value.length > 200) {
        hasError = true;
        error = "максимум 200 символов"
      } else {
        error = ""
      }
      break

    case "price":
      let regexpPrice = /^[0-9]{1,8}([,.][0-9]{1,2})?$/gm;
      if (value === '') {
        hasError = true;
        error = "Поле не может быть пустым"
      } else if (!(value.trim() && isFinite(value)) || +value < 0.01 || +value > 99999999.99 || !regexpPrice.test(value)) {
        hasError = true;
        error = "цена не корректна, пример: 10.99, min 0.01 - max 99999999.99"

      } else {
        error = ""
      }
      break
    case "discount":
      let regexpDiscount = /^[0-9]+$/;
      if (value.trim() === '') {
        error = ""
      } else if (!(value.trim() && isFinite(value)) || +value < 10 || +value > 90 || !regexpDiscount.test(value)) {
        error = "скидка - целое число от 10 до 90"
        hasError = true;
      }
      break;

    case "discountDateEnd":
      let now = new Date();
      let checkingDate = new Date(value);
      if (value.trim() === '') {
        error = ""
      } else if (checkingDate < now) {
        error = "Дата окончания скидки должна быть больше текущей даты"
        hasError = true;
      }
      break;
    default:
      break;
  }
  return { hasError, error }
}


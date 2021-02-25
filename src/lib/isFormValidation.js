import { ACTIONS } from "../components/cards/cardsContext/cardsReduser"
import { validateInput } from "./formUtils"

export const isFormValidation = (formState, dispatch) => {

  let isFormValid = true

  for (const name in formState) {
    const item = formState[name]
    const { value } = item
    const { hasError, error } = validateInput(name, value)
    if (hasError) {
      isFormValid = false
    }
    if (name !== "file_img") {
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
    if (formState.file_img.value === '') {
      isFormValid = false
      dispatch({
        type: ACTIONS.CHANGE_FIELD,
        payload: {
          name: "file_img",
          value: "",
          hasError: true,
          error: "Установите изображение",
          touched: true,
          isFormValid: false,
        },
      })
    }
  }
  return isFormValid
}


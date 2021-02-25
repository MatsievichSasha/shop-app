import React from 'react'

export const ACTIONS = {
  REMOVE_CARD: 'remove-card',
  EDIT_CARD: 'edit-card',
  CHANGE_FIELD: 'change-field',
  RESET: 'reset',
}

export const cardsReduser = (state, action) => {
  let name, file_img, description, price, discount, discountDateEnd, value, hasError, error, touched, isFormValid
  switch (action.type) {

    case ACTIONS.EDIT_CARD:
      ({ name, file_img, description, price, discount, discountDateEnd } = action.payload)

      return {
        ...state,
        name: { ...state.name, value: name },
        file_img: { ...state.file_img, value: file_img },
        description: { ...state.description, value: description },
        price: { ...state.price, value: price },
        discount: { ...state.discount, value: discount },
        discountDateEnd: { ...state.discountDateEnd, value: discountDateEnd },
      }

    case ACTIONS.CHANGE_FIELD:
      ({ name, value, hasError, error, touched, isFormValid } = action.payload)
      if (name === 'price') {
        value.replace(/,/g, '.')
      }
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      }

    case ACTIONS.RESET:
      return action.payload
  }

}



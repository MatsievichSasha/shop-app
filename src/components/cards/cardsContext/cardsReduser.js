import React from 'react'

export const ACTIONS = {
  ADD_CARD: 'add-card',
  REMOVE_CARD: 'remove-card',
  EDIT_CARD: 'edit-card',
  CHANGE_FIELD: 'change-field',
  RESET: 'reset',
}

export const cardsReduser = (state, action) => {
  switch (action.type) {
    /*     case ACTIONS.ADD_CARD:
          return 
        case ACTIONS.EDIT_CARD:
          return */
    case ACTIONS.CHANGE_FIELD:
      const { name, value, hasError, error, touched, isFormValid } = action.payload
      if (name === 'price') {
        value.replace(/,/g, '.')
      }
      console.log(value)
      console.log(error)
      console.log(hasError)
      console.log(isFormValid)

      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      }

    case ACTIONS.RESET:
      return action.payload
  }
  /*     case ACTIONS.REMOVE_CARD:
        return */



}



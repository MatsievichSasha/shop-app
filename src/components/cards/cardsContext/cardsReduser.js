import React from 'react'

export const ACTIONS = {
  ADD_CARD: 'add-card',
  REMOVE_CARD: 'remove-card',
  EDIT_CARD: 'edit-card',
  CHANGE_FIELD: 'change-field'
}

export const cardsReduser = (state, action) => {
  switch (action.type) {
    /*     case ACTIONS.ADD_CARD:
          return 
        case ACTIONS.EDIT_CARD:
          return */
    case ACTIONS.CHANGE_FIELD:
      return function name(params) {

      }
    /*     case ACTIONS.REMOVE_CARD:
          return */
  }
}


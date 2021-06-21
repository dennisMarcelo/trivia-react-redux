import {
  SELECTED_CATEGORY,
  CONFIG_AMOUNT,
  CONFIG_TYPE,
  CONFIG_DIFFICULTY }
  from '../action/index';

const initialState = {
  category: 0,
  amount: 5,
  type: 0,
  diff: 0,
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
  case SELECTED_CATEGORY:
    return {
      ...state,
      category: action.category,
    };

  case CONFIG_AMOUNT:
    return {
      ...state,
      amount: action.amount,
    };

  case CONFIG_TYPE:
    return {
      ...state,
      type: action.value,
    };

  case CONFIG_DIFFICULTY:
    return {
      ...state,
      diff: action.difficulty,
    };

  default:
    return state;
  }
};

export default configReducer;

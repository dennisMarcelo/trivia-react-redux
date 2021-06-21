import { SELECTED_CATEGORY, CONFIG_AMOUNT } from '../action/index';

const initialState = {
  category: 0,
  amount: 5,
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

  default:
    return state;
  }
};

export default configReducer;

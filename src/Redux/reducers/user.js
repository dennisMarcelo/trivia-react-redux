import { SET_USER } from '../action/index';

const initialState = {
  name: '',
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };

  default:
    return state;
  }
};

export default userReducer;

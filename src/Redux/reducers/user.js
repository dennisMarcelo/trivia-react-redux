import { SET_USER } from '../action/index';

const initialState = {
  name: '',
  image: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      name: action.payload.name,
      image: action.payload.image,
    };

  default:
    return state;
  }
};

export default userReducer;

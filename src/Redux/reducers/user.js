import { SET_USER } from '../action/index';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };

  default:
    return state;
  }
};

export default userReducer;

import {
  SET_USER,
  ADD_ASSERTION,
  RELOAD,
  SAVE_SCORE,
} from '../action/index';

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

  case ADD_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + action.payload.assertions,
    };

  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };

  case RELOAD:
    return initialState;

  default:
    return state;
  }
};

export default userReducer;

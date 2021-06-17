import {
  SET_USER,
  ADD_ASSERTION,
  RELOAD,
  ADD_SCORE_HARD,
  ADD_SCORE_MEDIUM,
  ADD_SCORE_EASY } from '../action/index';

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

  case ADD_SCORE_HARD:
    return {
      ...state,
      score: state.score + action.payload.hard,
    };

  case ADD_SCORE_MEDIUM:
    return {
      ...state,
      score: state.score + action.payload.medim,
    };

  case ADD_SCORE_EASY:
    return {
      ...state,
      score: state.score + action.payload.easy,
    };

  case RELOAD:
    return initialState;

  default:
    return state;
  }
};

export default userReducer;

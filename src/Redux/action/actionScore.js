import { ADD_SCORE_HARD, ADD_SCORE_MEDIUM, ADD_SCORE_EASY } from './index';

const TEN = 10;
const HARD = 3;
const MEDIUM = 2;

export const actionScoreHard = (time) => ({
  type: ADD_SCORE_HARD,
  payload: {
    hard: TEN + time * HARD,
  },
});

export const actionScoreMedium = (time) => ({
  type: ADD_SCORE_MEDIUM,
  payload: {
    medium: TEN + time * MEDIUM,
  },
});

export const actionScoreEasy = (time) => ({
  type: ADD_SCORE_EASY,
  payload: {
    easy: TEN + time,
  },
});

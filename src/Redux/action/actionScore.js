import { SAVE_SCORE } from './index';

const actionScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export default actionScore;

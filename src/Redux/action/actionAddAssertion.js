import { ADD_ASSERTION } from './index';

const actionAddAssertion = () => ({
  type: ADD_ASSERTION,
  payload: {
    assertions: 1,
    score: 10,
  },
});

export default actionAddAssertion;

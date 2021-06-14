import { SET_USER } from './index';

const setUserAction = (name, email) => ({
  type: SET_USER,
  payload: {
    name,
    email,
  },
});

export default setUserAction;

import { SET_USER } from './index';

const setUserAction = (name, gravatarEmail) => ({
  type: SET_USER,
  payload: {
    name,
    gravatarEmail,
  },
});

export default setUserAction;

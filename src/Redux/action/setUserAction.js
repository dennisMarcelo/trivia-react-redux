import { SET_USER } from './index';

const setUserAction = (name, image) => ({
  type: SET_USER,
  payload: {
    name,
    image,
  },
});

export default setUserAction;

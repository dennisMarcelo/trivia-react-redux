import { SELECTED_CATEGORY } from './index';

const actionSelectedCategory = (category) => ({
  type: SELECTED_CATEGORY,
  category,
});

export default actionSelectedCategory;

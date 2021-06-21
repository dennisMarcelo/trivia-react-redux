import { CONFIG_AMOUNT } from './index';

const actionQuestionsAmount = (amount) => ({
  type: CONFIG_AMOUNT,
  amount,
});

export default actionQuestionsAmount;

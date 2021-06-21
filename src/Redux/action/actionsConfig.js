import {
  CONFIG_AMOUNT,
  CONFIG_TYPE,
  SELECTED_CATEGORY,
  CONFIG_DIFFICULTY }
  from './index';

export const selectedCategory = (category) => ({
  type: SELECTED_CATEGORY,
  category,
});

export const questionsAmount = (amount) => ({
  type: CONFIG_AMOUNT,
  amount,
});

export const questionType = (value) => ({
  type: CONFIG_TYPE,
  value,
});

export const questionDifficulty = (difficulty) => ({
  type: CONFIG_DIFFICULTY,
  difficulty,
});

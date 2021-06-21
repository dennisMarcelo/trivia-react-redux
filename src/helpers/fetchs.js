export async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json());
  return response.token;
}

export async function fetchCategories() {
  const response = await fetch('https://opentdb.com/api_category.php')
    .then((data) => data.json());
  return response;
}
export const fetchQuestions = (token) => async (amount, difficulty, type, category) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&type=${type}&difficulty=${difficulty}&category=${category}&token=${token}`)
    .then((data) => data.json());
  return response;
};

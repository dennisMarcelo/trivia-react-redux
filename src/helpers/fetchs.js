export async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json());
  return response.token;
}

export async function fetchQuestions(amount, token, category) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&token=${token}`)
    .then((data) => data.json());
  return response;
}

export default async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json());
  return response.token;
}

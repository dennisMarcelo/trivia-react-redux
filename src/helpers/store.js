export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function savePlayer(player) {
  console.log(player);

  localStorage.setItem('state', JSON.stringify(player));
}

export function saveRanking(player) {
  localStorage.setItem('ranking', player);
}

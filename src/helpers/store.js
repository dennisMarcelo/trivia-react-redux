export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function savePlayer(player) {
  console.log(JSON.parse(player).player.score);
  localStorage.setItem('state', player);
}

export function saveRanking(player) {
  localStorage.setItem('ranking', player);
}

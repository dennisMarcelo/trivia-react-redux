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
  if (localStorage.getItem('ranking')) {
    const arrayRanking = JSON.parse(localStorage.getItem('ranking'));
    arrayRanking.push(player);
    localStorage.setItem('ranking', JSON.stringify(arrayRanking));
  } else {
    localStorage.setItem('ranking', JSON.stringify([player]));
  }
}

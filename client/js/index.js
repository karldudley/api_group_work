// ********************************************
// SETUP


const btn = document.querySelector('button');
const form = document.querySelector('#new-player-form');
const form2 = document.querySelector('#delete-player-form');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitPlayer);
form2.addEventListener('submit', deletePlayers);

// Fetch all players as soon as app is loaded
getAllPlayers();
// ********************************************

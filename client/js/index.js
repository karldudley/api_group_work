// ********************************************
// SETUP
const btn = document.querySelector('button');
const form = document.querySelector('#new-player-form');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitPlayer);

// Fetch all cats as soon as app is loaded
getAllPlayers();
// ********************************************

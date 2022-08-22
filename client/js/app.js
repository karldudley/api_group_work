// ********************************************
// PLAYERS FLOW
// index
function getAllPlayers(){
    fetch('http://localhost:3000/players')
        .then(r => r.json())
        .then(appendPlayers)
        .catch(console.warn)
};

// create player
function submitPlayer(e){
    e.preventDefault();

    const playerData = {
        id: e.target.id.value,
        name: e.target.name.value,
        team: e.target.team.value,
        number: e.target.number.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(playerData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('http://localhost:3000/players', options)
        .then(r => r.json())
        .then(appendPlayer)
        .catch(console.warn)
};

// helpers
function appendPlayers(p){
    p.forEach(appendPlayer);
};

function appendPlayer(pData){
    const newLi = document.createElement('li');
    newLi.textContent = `Name: ${pData.name} || Team: ${pData.team} || Number: ${pData.number}`;
    const playerList = document.querySelector('ul');
    playerList.append(newLi);
};

// MESSAGE FLOW
function getMessage(){
    fetch('http://localhost:3000')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
};

function renderMessage(msgText){
    const msg = document.createElement('p');
    msg.textContent = msgText;
    msg.style.color = 'red';
    document.body.append(msg);
};

// ********************************************

module.exports = {
    getAllPlayers,
    submitPlayer,
    appendPlayers,
    appendPlayer,
    getMessage,
    renderMessage
}

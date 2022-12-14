// ********************************************
// PLAYERS FLOW
// index
function getAllPlayers(){
    fetch('http://localhost:3000/players')
        .then(r => r.json())
        .then(appendPlayers)
        .catch(console.warn)
};

// //Testing making a request to another api
// function getAllPlayers() {
//     fetch('https://reqres.in/api/users')
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// }

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

//delete all players
function deletePlayers(e) {
    e.preventDefault();
    const options = { 
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('http://localhost:3000/players', options)
    .then(r => console.log("All players deleted"))
    .catch(console.warn)
}

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

// // These don't work when running in the browser. Maybe need them when running on node
// // If I need browser and node then I will have to use watchify to bundle them??
// module.exports = {
//     getAllPlayers,
//     submitPlayer,
//     appendPlayers,
//     appendPlayer,
//     getMessage,
//     renderMessage,
//     deletePlayers
// }



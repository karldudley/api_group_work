const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

//football players array
const players = [
    {id: 1, name: "De Bruyne", team: "Manchester City", number: 17},
    {id: 2, name: "Kante", team: "Chelsea", number: 7},
    {id: 3, name: "Kane", team: "Spurs", number: 10},
];

//send message on homepage
app.get('/', (req, res) => {
    res.send('Premier League Football Players')
  })

// send message to say they can't create new entries here
app.post('/', (req, res) => {
    res.status(405).send('Can not add players here!')
})

//show all players in the database on this page as a json
app.get('/players', (req, res) => {
    res.json(players)
})

//deal with requests to numbers afters /players. Throw error if player is not in database and display message
app.get('/players/:id', (req, res) => {
    try {
      const playerId = parseInt(req.params.id);
      //find the cat in the array
      const selectedPlayer = players.find(c => c.id === playerId)
      if (!selectedPlayer) {
        throw new Error('That player does not exist!')
      }
      //show selected cat
      res.send(selectedPlayer)
    } catch (err) {
      console.log(err);
      res.send('This player is not in our database!')
      res.status(404).send(err)
    }
})

//add a new player
app.post('/players', (req, res) => {
    const newName = req.body.name
    const newTeam = req.body.team
    const newNumber = req.body.number
    const newId = players[players.length - 1].id + 1
    let newPlayer = {name: newName, team: newTeam, number: newNumber}
  
    players.push({id: newId, ...newPlayer})
    res.status(201).send(newPlayer)
})

app.delete('/players', (req, res) => {
    while (players.length) players.pop()
    res.status(204).end()
})

//delete an individual player
app.delete('/players/:id', (req, res) => {

    const playerId = parseInt(req.params.id);
    const selectedPlayer = players.find(c => c.id === playerId)

    players.pop();

    //while (players.length) players.pop()
    res.status(204).end()
})

module.exports = app;

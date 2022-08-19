const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

//cats resource - this would typically be a database
const cats = [
  { id: 1, name: 'Zelda', age: 3 },
  { id: 2, name: 'Tigerlily', age: 10 },
  { id: 3, name: 'Rumble', age: 12 },
];

//send message on homepage
app.get('/', (req, res) => {
  res.send('Welcome to World of Cats!')
})

// send message to say they can't create new entries here
app.post('/', (req, res) => {
  res.status(405).send('Not allowed!')
})

//show all cats in the database on this page as a json
app.get('/cats', (req, res) => {
  res.json(cats)
})

//deal with requests to numbers afters /cats. Throw error if cat is not in database and display message
app.get('/cats/:id', (req, res) => {
  try {
    const catId = parseInt(req.params.id);
    //find the cat in the array
    const selectedCat = cats.find(c => c.id === catId)
    if (!selectedCat) {
      throw new Error('That cat does not exist!')
    }
    //show selected cat
    res.send(selectedCat)
  } catch (err) {
    console.log(err);
    res.send('This cat is not in our database!')
    res.status(404).send(err)
  }
})

app.post('/cats', (req, res) => {
  
  console.log("line 22", req.body)

  const newName = req.body.name
  const newAge = req.body.age
  const newId = cats[cats.length - 1].id + 1
  let newCat = {name: newName, age: newAge, adopted: false}

  cats.push({ ...newCat, id: newId})
  res.status(201).send(newCat)

  //ALT CODE
  // const data = req.body
  // const newCatId = cats.length + 1
  // const newCat = {id: newCatId, ...data}
  // cats.push(newCat)
  // res.status(201).send(newCat)
})

app.delete('/cats', (req, res) => {
  while (cats.length) cats.pop()
  res.status(204).end()
})

module.exports = app;

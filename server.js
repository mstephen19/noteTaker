const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const db = require('./db/db.json');

const app = express();
const PORT = 5000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
  res.status(200).send(`Received ${req.method} request!`)
  // let toWrite = db.push(req.body)
  db.push(req.body)
  fs.writeFile('./db/db.json', JSON.stringify(db, null, '\t'), err => err ? console.error(err) : null)

})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
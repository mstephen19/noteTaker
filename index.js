const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.route('/api/notes')
.get((req, res) => res.status(200).json(db))
.post((req, res) => {
  res.status(201).send(`Received ${req.method} request!`)
  req.body['id'] = uuidv4();
  db.push(req.body)
  fs.writeFile('./db/db.json', JSON.stringify(db, null, '\t'), err => err ? console.error(err) : null)
});

app.delete('/api/notes/:id', (req, res)=>{
  res.status(203).send(`Received ${req.method} request!`)
  let noteId = req.params.id
  for(let i=0; i<db.length;i++){
    if(noteId === db[i].id){
      db.splice(i, 1)
    }
  }
  fs.writeFile('./db/db.json', JSON.stringify(db, null, '\t'), err => err ? console.error(err) : null)
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
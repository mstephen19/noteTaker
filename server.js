const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.static('public'));



app.listen(PORT, _=>{
  console.log(`Serving static asset routes on port ${PORT}!`)
})
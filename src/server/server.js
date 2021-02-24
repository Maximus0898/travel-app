const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// Express app setup
const app = express();

app.use(express.static('dist'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors
app.use(cors());

console.log(__dirname);

app.get('/', (req, res) => {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'));
});

const port = process.env.PORT || 8082;

// designates what port the app will listen to for incoming requests
app.listen(port, () => {
  console.log(`Travel app listening on port ${port}!`);
});

// Post req

let projectData = {};

app.post('/addData', async (req, res) => {
  const data = await req.body.data;
  console.log('From post req handler...', data);
  projectData = data;
  console.log('This is from projectData ----', projectData);
  res.end();
});

app.get('/travel', (req, res) => {
  res.send(projectData);
});

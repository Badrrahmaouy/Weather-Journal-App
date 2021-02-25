const projectData = {};
// Express to run server and routes
const express = require('express');
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

app.use(cors());

app.use(express.static('website'));
const port = 5500;
const server = app.listen(port, () => { console.log(`the server is running on port ${port}`)});

const data = [];
// Get Route
app.get('/', getData);
function getData (req, res) {
    res.send(projectData);
}
// Post Route
app.post('/', addData);
function addData(req, res) {
    projectData['date'] = req.body.date;
    projectData['feelings'] = req.body.feelings;
    projectData['temp'] = req.body.tem;
    res.send(projectData)
}
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
const port = 8000;
const server = app.listen(port, () => { console.log(`the server is running on port ${port}`)});

const data = [];
// Get Route
app.get('/all', getData);
function getData (req, res) {
    res.send(data);
}
// Post Route
app.post('/add', addData);
function addData(req, res) {
    newEntry = {
        zipcode = req.body.zip,
        feelings = req.bpdy.feelings
    };
    data.push(newEntry);
    res.send(data)
}
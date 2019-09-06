const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('App started on port 3000');
});

//DONT FORGET TO CHANGE THE PORT BEFORE YOU PUSH TO MASTER

const express = require('express')
const app = express()
const port = process.env.PORT
const localport = 3000

app.use(express.static('Public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/html', function(req, res) {
    res.sendfile(__dirname + '/Public/index.html');
});

var server = app.listen(localport, function () {
    console.log("Server is up and running at " + localport);
});
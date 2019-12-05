
//DONT FORGET TO CHANGE THE PORT BEFORE YOU PUSH TO MASTER

const express = require('express')
const app = express()
const port = process.env.PORT
const localport = 3000



app.use(express.static('Public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname +'/Public/index.html');
});

app.get('/Angry-Coins', function(req, res) {
    res.sendfile(__dirname + '/Public/KBgame.html');
});

var server = app.listen(port, function () {
    console.log("Server is up and running at " + port);
});
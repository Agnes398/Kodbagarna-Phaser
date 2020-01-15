const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('Public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname +'/Public/index.html');
});

app.get('/Angry-Coins', function(req, res) {
    res.sendFile(__dirname + '/Public/Angry-Coins/Angry-Coins.html');
});

app.get('/Plattform-Blast', function(req, res) {
    res.sendFile(__dirname + '/Public/Plattform-Blast/PlattformBlast.html')
});

app.get('/CubeRunner', function(req, res) {
    res.sendFile(__dirname + '/Public/CubeRunner/CubeRunner.html')
});

var server = app.listen(port, function () {
    console.log("Server is up and running at " + port);
});
const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', function (req, res) {
    res.send('Hello World!');
})

var server = app.listen(port, function () {
    console.log("Server is up and running at " + port);
})
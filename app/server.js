var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/diary/:userId', (req, res) => {
    res.send("GET user" + req.params.userId);
})

app.post('/diary/:userId', (req, res) => {
    res.send("POST user" + req.params.userId);
})

app.put('/diary/:userId', (req, res) => {
    res.send("PUT user" + req.params.userId);
})

app.delete('/diary/:userId', (req, res) => {
    res.send("DELETE user" + req.params.userId);
})

app.listen(80);
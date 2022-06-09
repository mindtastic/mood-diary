var express = require('express');
var app = express();

const { Pool } = require('pg');

const connectionString = 'postgres://root:root@127.0.0.1:5432/diary';

const pool = new Pool({
    user: 'root',
    password: 'root',
    host: 'postgres',
    database: 'diary',
    port: 5432,
})

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/diary/:userId', (req, res) => {

    let query = 'SELECT * FROM dev.mood_entries WHERE user_id=$1';
    let values = [req.params.userId];

    console.log(query);

    pool.query(query, values, (err, resp) => {
        if (err) {
            console.log(err);

            res.status(500).send(err);
        } else {
            console.log(resp);

            res.status(200).send(resp);
        }
    });

    //res.send("GET user" + req.params.userId);
})

app.post('/diary/:userId', (req, res) => {
    res.send("POST user" + req.params.userId);
})

app.put('/diary/:userId', (req, res) => {
    res.send("Hey user" + req.params.userId);
})

app.delete('/diary/:userId', (req, res) => {
    res.send("DELETE user" + req.params.userId);
})

app.listen(80);
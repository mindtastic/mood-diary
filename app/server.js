var express = require('express');
var app = express();
const { Sequelize, DataTypes, Op } = require('sequelize');

const connectionString = 'postgres://root:root@postgres:5432/diary';
const sequelize = new Sequelize(connectionString);

const Mood = require("./model.js")(sequelize, DataTypes);

sequelize.authenticate().then(() => console.log("\x1b[32m", "Successfully authenticated to PostgreSQL", "\x1b[0m"));
Mood.sync().then(() => console.log("\x1b[32m", "Successfully synchronized database model.", "\x1b[0m"));

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/diary/:userId', (req, res) => {

    Mood.findAll({
        where: {
            user_id: {
                [Op.eq]: req.params.userId
            }
        }
    }).then((result) => res.status(200).send(result)).catch((err) => res.status(500).send(err))
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
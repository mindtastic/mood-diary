var express = require('express');
var app = express();
const { Sequelize, DataTypes, Op } = require('sequelize');

const connectionString = 'postgres://root:root@postgres:5432/diary';
const sequelize = new Sequelize(connectionString);

const Mood = require("./model.js")(sequelize, DataTypes);

sequelize.authenticate().then(() => console.log("\x1b[32m", "Successfully authenticated to PostgreSQL", "\x1b[0m"));
Mood.sync().then(() => console.log("\x1b[32m", "Successfully synchronized database model.", "\x1b[0m"));


app.use(express.json());


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
    if (!req.body) {
        res.status(400).send("Request body undefined");
        return;
    }

    let timestamp = req.body.timestamp;

    if (!timestamp) {
        timestamp = new Date();
    }

    Mood.create({
        user_id: req.params.userId,
        mood_day: timestamp,
        mood_type: req.body.type,
        mood_descr: req.body.description
    }).then(() => res.status(200).send(new_mood));
})

app.put('/diary/:userId', (req, res) => {
    res.send("Hey user" + req.params.userId);
})

app.delete('/diary/:userId', (req, res) => {
    res.send("DELETE user" + req.params.userId);
})

app.listen(80);
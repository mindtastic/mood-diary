var authMiddleware = require('../middleware/auth.js');
const { Op } = require("sequelize");
const db = require("../db");
// const MoodEntry = db.mood;
// const User = db.user;

module.exports = app => {
    app.use(authMiddleware);

    // Get  entry by id. Return mood entry content {id, mood_day, mood_type, mood_descr}
    app.get('/diary/:id', (req, res) => {
        const id = req.params.id;
        console.log("Entry id:" + req.params.id);

        db.mood.findByPk(id).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        });
    });

    // Get All entries by user id. 
    app.get('/diary', (req, res) => {
        const user = req.user.uid;
        db.mood.findAll({
            limit: 30,
            where: {
                author_id: user
            }
        }).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    });

    // Create a new mood entry.
    app.post('/diary', (req, res) => {
        const user = req.user.uid;
        // Insert into mood_entries table.
        db.mood.create({
            author_id: user,
            mood_day: req.body.day,
            mood_type: req.body.type,
            mood_descr: req.body.description
        }).then(() => {
            res.status(201).send({
                message: "Created."
            });
        }).catch(err => {
            res.status(500).send(err)
        });
    });

    // Delete mood entry by id.
    app.delete('/diary/:id', (req, res) => {
        const id = Number(req.params.id)
        
        // Delete from mood_entries table.
        db.mood.destroy({
            where: { id: id }
        }).then(num => {
            if (num == 1) {
                res.status(204).send()
            } else {
                res.status(400).send({
                    message: `Cannot delete Mood Entry with id=${id}. Maybe the Entry was not found!`
                })
            }
        }).catch(err => {
            res.status(500).send.send(err)
        })
    })

}
var authMiddleware = require('../middleware/auth.js');
const db = require("../db");

module.exports = app => {
    app.use(authMiddleware);
    //  Health Check.
    app.get('/health', (req, res) => {
        res.stauts(204).end();
    })

    
    // Fetch single mood diary entry by entry id.
    app.get('/diary/:id', (req, res) => {
        const id = req.params.id;

        // Find mood diary entry by param (timestamp or id) provided.
        db.mood.findByPk(id).then(data => {
            if (data) {
                res.status(200).send(data)
            } else {
                res.status(404).send({
                    message: "Cannot fetch Mood Entry with id=${id}. Entry was not found."
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        });
    });

    // Get all mood diaries for userId provided in the header.
    app.get('/diary', (req, res) => {
        const user = req.user.uid;
        // Find all mood entries matching authorId.
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

    // Add mood to diary.
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
        const entryID = Number(req.params.id)

        // Delete from mood_entries table.
        db.mood.destroy({
            where: { id: entryID }
        }).then(id => {
            if (id == 1) {
                res.status(204).send()
            } else {
                res.status(404).send({
                    message: "Cannot delete Mood Entry with id=${entryID}. Entry was not found."
                })
            }
        }).catch(err => {
            res.status(500).send.send(err)
        })
    })

    // TODO add tilt  routes
    app.get('/tilt/', (req, res) =>{
        // TODO 
    })
    // TODO add endpoint for motivator service, motivator calls mood diary return 
    app.get('/motivator/', (req, res) =>{

        //TODO 
    })

}
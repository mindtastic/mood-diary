var User = require("../db/index.js").User
var Mood = require("../db/index.js").Mood
module.exports = app => {

    // Testing connection endpoint
    app.get('/', function (req, res) {
        res.send("Hello world!");
    });

    // Get user by userID
    app.get('/diary/:userId', (req, res) => {
        let uid = req.params.userId;
       
        User.findOrCreate({ 
            where: {
                uid: req.params.userId
            }
        }).then((result) => res.status(200).send(result)).catch((err) => res.status(500).send(err));


    })

    // Get all mood entires for user
    app.get('/diary/:uid', (req, res) => {
        Mood.findAll({
            where: {
                uid: {
                    [Op.eq]: req.params.uid
                }
            }
        }).then((result) => res.status(200).send(result)).catch((err) => {
            console.log(err);
        })
    })

    // Create mood entry for user_ID
    app.post('/diary', (req, res) => {

        if (!req.body) {
            res.status(400).send("Request body undefined");
            return;
        }

        let timestamp = req.body.timestamp;

        if (!timestamp) {
            timestamp = new Date();
        }

        Mood.create({
            user_id: req.body.userId,
            mood_day: timestamp,
            mood_type: req.body.type,
            mood_descr: req.body.description
        }).then((new_mood) => res.status(201).send(new_mood)).catch((err) => res.status(500).send(err))
    })
    
    // Delete mood entry by mood_ID
    app.delete('/diary/:userId', (req, res) => {

        // const id = Number(req.params.productID)
        // const index = products.findIndex(product => product.id === id)
        // if (index === -1) {
        //     return res.status(404).send('Product not found')
        // }
        // products.splice(index, 1)
        // res.status(200).json('Product deleted')
        res.send("DELETE user" + req.params.userId);
    })


}
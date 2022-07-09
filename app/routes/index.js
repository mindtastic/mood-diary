import db from '../db';
import authMiddleware from '../middleware/auth';
import validateError from '../middleware/validationError';
import { notFoundError, serverError } from '../middleware/defaultError';
import { usingPipe } from '../utils';
import { spawn } from 'child_process';


const applyMiddlewares = (app) => {
  app.use(authMiddleware);
};

const applyErrorHandlers = (app) => {
  app.use(notFoundError);
  app.use(validateError);
  app.use(serverError);
};

const defineRoutes = (app) => {
  //  Health Check.
  app.get('/health', (req, res) => {
    res.status(204).end();
  });

  // Fetch single mood diary entry by entry id.
  app.get('/diary/:id', (req, res, next) => {
    const { id } = req.params;

    // Find mood diary entry by param (timestamp or id) provided.
    db.mood.findByPk(id).then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot fetch Mood Entry with id=${id}. Entry was not found.`,
        });
      }
    }).catch(next);
  });

  // Get all mood diaries for userId provided in the header.
  app.get('/diary', (req, res, next) => {
    const user = req.user.uid;
    // Find all mood entries matching authorId.
    db.mood.findAll({
      limit: 30,
      where: {
        author_id: user,
      },
    }).then((data) => {
      res.status(200).send(data);
    }).catch(next);
  });

  // Add mood to diary.
  app.post('/diary', (req, res, next) => {
    const user = req.user.uid;

    // Insert into mood_entries table.
    db.mood.create({
      author_id: user,
      mood_day: req.body.mood_day,
      mood_type: req.body.mood_type,
      mood_descr: req.body.mood_descr,
    }).then((created) => {
      res.status(201).send(created);
    }).catch(next);
  });

  // Delete mood entry by id.
  app.delete('/diary/:id', (req, res, next) => {
    const entryID = Number(req.params.id);
    if (!entryID) {
      res.status(400).send({ error: 'Invalid URI param: id' });
      return;
    }

    // Delete from mood_entries table.
    db.mood.destroy({
      where: { id: entryID },
    }).then((numDeleted) => {
      if (numDeleted < 1) {
        return res.status(404).send({
          message: `Cannot delete Mood Entry with id=${entryID}. Entry was not found.`,
        });
      }

      return res.status(204).end();
    }).catch(next);
  });

  // Get Tilt schema for mood diary
  app.get('/tilt', (req, res) => {
    var process = spawn('python3', ['app/tilt/mood_tilt.py']);
    var tilt_data = [];
    
    process.stdout.on('data', function (data) {
      tilt_data.push(data);  
     });

    process.stderr.on('data', data => {
      console.error(`stderr: ${data}`);
    })

     process.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send tilt schema 
      res.send(tilt_data.join(""));
      });

  });
  

};

export default (app) => {
  usingPipe(app, applyMiddlewares, defineRoutes, applyErrorHandlers);
};

import express from 'express';
import log from 'loglevel';
import bodyParser from 'body-parser';
import db from './db';
import applyMoodRoutes from './routes';

const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

log.info('Initialized logger');

//  Health Check.
app.get('/health', (req, res) => {
    res.status(200).end();
});

applyMoodRoutes(app);

db.sequelize.authenticate()
  .then(() => log.info('Successfully authenticated to PostgreSQL'))
  .catch((e) => log.error(`Error connecting to database: ${e}`));

db.sequelize.sync({ force: true })
  .then(() =>  log.info('Successfully authenticated to PostgreSQL'))
  .catch((e) => {
    log.error(`Error running migrations: ${e}`);
    log.trace(e);
  });

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  log.info(`Server is running at https://localhost:${PORT}`);
});

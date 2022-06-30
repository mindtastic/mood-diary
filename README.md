# mood-diary

Mood Diary service using \~\~ExpressJS and PostgreSQL\~\~

## Run in Docker

### Local development

The development setup uses nodemon with Docker. The app directory is therefore mapped to the server's container working directory while Docker is running. Changes to the source code will be immediately reflected on the container.

Run `docker compose -f docker-compose.dev.yml up -d`

Postgres will be initialized with a test data set in `diary.dev.mood_entries`.

### Testing

For testing/observation purposes, use the regular `docker compose up`. This will not map live directories.

## Database

This setup runs PGAdmin on `localhost:5433` and PostgreSQL on `localhost:5432`.

### Schema

![DB SQL Schema](/docs/dbModel.png)

### Credentials

*PGAdmin*

Username: `admin@mindtastic.lol`  
Password: `root`

*PostgreSQL*

Database: `diary`  
Username: `root`  
Password: `root`

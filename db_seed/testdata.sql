CREATE SCHEMA IF NOT EXISTS dev;
CREATE TABLE diary.dev.mood_entries (
    id SERIAL PRIMARY KEY,
    mood_day TIMESTAMPTZ NOT NULL,
    mood_type VARCHAR (50) NOT NULL,
    mood_descr VARCHAR (50)
);

CREATE TABLE diary.dev.users (
    uid UUID NOT NULL PRIMARY KEY
   
);

INSERT INTO diary.dev.users(uid)
    VALUES ('40e6215d-b5c6-4896-987c-f30f3678f608');


INSERT INTO diary.dev.mood_entries(mood_day, mood_type, mood_descr)
    VALUES ('2016-06-22 19:10:25-07', 'negative', 'fuming');



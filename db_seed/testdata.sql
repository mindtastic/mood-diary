CREATE TABLE diary.users (
    uid UUID NOT NULL PRIMARY KEY
   
);
CREATE TABLE diary.mood_entries (
    id SERIAL PRIMARY KEY,
    mood_day TIMESTAMPTZ NOT NULL,
    mood_type VARCHAR (50) NOT NULL,
    mood_descr VARCHAR (50),
    author_id UUID references diary.users(uid) NOT NULL
);

INSERT INTO diary.users(uid)
    VALUES ('40e6215d-b5c6-4896-987c-f30f3678f608');


INSERT INTO diary.mood_entries(mood_day, mood_type, mood_descr, author_id)
    VALUES ('2016-06-22 19:10:25-07', 'negative', 'fuming','40e6215d-b5c6-4896-987c-f30f3678f608');



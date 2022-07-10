CREATE TABLE users (
    uid UUID NOT NULL PRIMARY KEY
   
);
CREATE TABLE mood_entries (
    id SERIAL PRIMARY KEY,
    mood_day TIMESTAMPTZ NOT NULL,
    mood_type VARCHAR (50) NOT NULL,
    mood_descr VARCHAR (50),
    author_id UUID references users(uid) NOT NULL
);


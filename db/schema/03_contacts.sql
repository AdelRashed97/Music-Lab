DROP TABLE IF EXISTS contacts CASCADE;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id_1 INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user_id_2 INTEGER REFERENCES users(id) ON DELETE CASCADE
)
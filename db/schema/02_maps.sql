DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  rating SMALLINT DEFAULT 0,
  date_created DATE,
  last_edited_on DATE,
  last_edited_by INTEGER REFERENCES users(id) ON DELETE CASCADE
);

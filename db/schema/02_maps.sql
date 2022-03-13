DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  rating SMALLINT NOT NULL DEFAULT 0,
  date_created DATE NOT NULL,
  last_edited_on DATE NOT NULL,
  last_edited_by INTEGER REFERENCES users(id) ON DELETE CASCADE
);
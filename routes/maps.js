const express = require('express');
const router  = express.Router();




module.exports = (db) => {

  router.post("/", (req, res) => {
    const { title, description } = req.body;

    let queryString = (`
      INSERT INTO maps (title, description, user_id)
      VALUES ($1, $2, now()::date) RETURNING *;
    `);
    db
    .query(queryString, [title, description, created_at])
    .then((data) =>
      res.redirect("./"))
});
return router;
};

// DROP TABLE IF EXISTS maps CASCADE;
// CREATE TABLE maps (
//   id SERIAL PRIMARY KEY NOT NULL,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   title VARCHAR(255),
//   description TEXT,
//   rating SMALLINT NOT NULL DEFAULT 0,
//   date_created DATE NOT NULL,
//   last_edited_on DATE NOT NULL,
//   last_edited_by INTEGER REFERENCES users(id) ON DELETE CASCADE
// );

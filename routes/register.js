const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');




module.exports = (db) => {

  router.post("/", (req, res) => {



  const { name, email, password } = req.body;
  const date = Date.now();

  let queryString = (`
    INSERT INTO users (name, email, password, date_created)
    VALUES ($1, $2, $3, now()::date) RETURNING *;
  `);
  db
  .query(queryString, [req.body.name, req.body.email, req.body.password])
  .then((data) =>
    res.redirect("./"))



  });



return router;
};


// DROP TABLE IF EXISTS users CASCADE;
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   country VARCHAR(255) NOT NULL,
//   province VARCHAR(255) NOT NULL,
//   city VARCHAR(255) NOT NULL,
//   street VARCHAR(255) NOT NULL,
//   postal_code VARCHAR(255) NOT NULL,
//   date_created DATE NOT NULL
// );


const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { checkLogin } = require('./helper_functions');

module.exports = (db) => {
  router.post('/', (req, res) => {
    // console.log(req.body)
    // console.log(req.body.email);

    const isEmailInDb = checkLogin(req.body, db);
    isEmailInDb.then((data) => {
      console.log(data);
      if (data) {
        res
          .status(400)
          .send('Email already registered, Please <a href="/login">login!</a>');
        return;
      } else {
        console.log('Huzzah!');
        console.log(data, 'data');

        let queryString = `
        INSERT INTO users (name, email, password, date_created)
        VALUES ($1, $2, $3, now()::date) RETURNING *;
  `;
        db.query(queryString, [
          req.body.name,
          req.body.email,
          req.body.password,
        ]).then((data) => {
          console.log(data.rows[0].id, 'data from cookie query');
          req.session.id = data.rows[0].id;
          console.log(req.session.id, 'session');
          res.redirect('./');
        });
      }
    });

    const { name, email, password } = req.body;
    // const date = Date.now();
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

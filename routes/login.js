const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { checkLogin } = require('./helper_functions');

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('login');
  });

  router.post('/register', (req, res) => {
    const isEmailInDb = checkLogin(req.body, db);
    isEmailInDb.then((data) => {
      if (data) {
        res
          .status(400)
          .send('Email already registered, Please <a href="/login">login!</a>');
        return;
      } else {
        let queryString = `
        INSERT INTO users (name, email, password, date_created)
        VALUES ($1, $2, $3, now()::date) RETURNING *;
  `;
        db.query(queryString, [
          req.body.name,
          req.body.email,
          req.body.password,
        ]).then((data) => {
          req.session.id = data.rows[0].id;
          const templateVars = { user: req.session.id };
          res.render('index', templateVars);
          return;
        });
      }
    });
  });

  router.post('/login', (req, res) => {
    let templateVars = {};

    const isEmailInDb = checkLogin(req.body, db);
    isEmailInDb
      .then((data) => {
        console.log(data.id);
        req.session.id = data.id;
        console.log(req.session.id);
        templateVars = { user: req.session.id };
        res.render('index', templateVars);
        return;
      })
      .catch((err) => {
        res
          .status(400)
          .send('Email not registered, Please <a href="/login">register!</a>');
        return;
      });
  });
  return router;
};

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { checkLogin } = require('./helper_functions');

module.exports = (db) => {
  router.get('/', (req, res) => {
    let queryString = `
  SELECT *
  FROM users
  `;
    db.query(queryString).then((data) => console.log());
    res.render('login');
  });
  router.post('/', (req, res) => {
    if (req.session.id) {
      const isEmailInDb = checkLogin(req.body, db);
      isEmailInDb
        .then((data) => {
          if (req.session.id === data.id) {
            res.redirect('/');
          } else {
            res.status(400).send('Email does not exist');
            return;
          }
        })
        .catch(() => {
          res
            .status(400)
            .send(
              'Email not registered, Please <a href="/login">register!</a>'
            );
          return;
        });
    }
  });
  return router;
};

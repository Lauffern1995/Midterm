const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getMap } = require('./helper_functions');

module.exports = (db) => {
  router.post('/', (req, res) => {
    const { title, description } = req.body;
    console.log('title:', title);
    console.log('desc:', description);

    let queryString = `
      INSERT INTO maps (title, description, date_created)
      VALUES ($1, $2, now()::date) RETURNING *;
    `;
    db.query(queryString, [title, description]).then((data) =>
      res.redirect('./')
    );
  });

  router.get('/', (req, res) => {
    const { title } = req.body;
    const map = getMap(title, db);
    map.then((data) => {
      console.log(data.title);
    });

    res.render('maps');
  });

  router.get('/:id', (req, res) => {});

  return router;
};

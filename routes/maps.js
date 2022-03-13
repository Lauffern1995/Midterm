const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getMap } = require('./helper_functions');

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.render('maps');
  });

  router.post('/', (req, res) => {
    const { title } = req.body;
    const map = getMap(title, db);
    map.then((data) => {
      console.log(data.title);
    });

    res.render('maps');
  });
  return router;
};

const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getMapByLike } = require('./helper_functions');

module.exports = (db) => {
  router.get('/', (req, res) => {

    const { title } = req.body;

    const search = getMapByLike(title, db);
    search.then((data) => {

      console.log(hello)
    // res.render();
    });
  });

  return router;
};

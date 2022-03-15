const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getMap, getAllMaps } = require('./helper_functions');
const { Template } = require('ejs');

module.exports = (db) => {
  // router.get('/', (req, res) => {

  //   let user_id = req.session.id
  //   let templateVars = {user: req.session.id};

  //   mapList = getUserMaps(user_id, db);
  //   mapList.then((maps) => {
  //     templateVars = { user: req.session.id, maps: maps }
  //     res.render('index', templateVars);
  //   })
  // });

  return router;
};

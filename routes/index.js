const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const { getAllMaps } = require('./helper_functions');

module.exports = (db) => {
  router.get('/', (req, res) => {
    let templateVars = {
      user: req.session.user_id,
    };

    mapList = getAllMaps(db);
    mapList.then((data) => {
      templateVars = { user: req.session.user_id, data: data };
      res.render('index', templateVars);
    });
  });

  // ------ Get Users Created Maps ------
  router.get('/getusermaps', (req, res) => {
    let templateVars = {};
    console.log(templateVars, ' Template Vars from /getusermaps ');

    mapList = getAllMaps(db);
    mapList.then((data) => {
      templateVars = { data: data };
      res.render('index', templateVars);
    });
  });

  router.post('/search_map', (req, res) => {
    console.log('maps search');
  });

  router.post('/fav_map', (req, res) => {
    console.log('maps fav');
  });

  router.post('/pop_map', (req, res) => {
    console.log('maps search');
  });

  return router;
};

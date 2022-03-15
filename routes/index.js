const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const { getAllMaps } = require('./helper_functions');




module.exports = (db) => {

  router.get('/', (req, res) => {

    let templateVars = { user: req.session.id };

    mapList = getAllMaps(db);

    mapList.then((data) => {

      templateVars = { user: req.session.id, data: data };

      res.render('index', templateVars);

    });

  });

  // ------ Get Users Created Maps ------
  router.post('/getusermaps', (req, res) => {

    let templateVars = { user: req.session.id };

    console.log(templateVars, ' Template Vars from /getusermaps ');

    // NEED TO CHANGE TO USER MAPS NOT ALL MAPS //

    mapList = getAllMaps(db);

    mapList.then((data) => {

      templateVars = { user: req.session.id, data: data };

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

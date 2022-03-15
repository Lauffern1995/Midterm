const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const {
  getAllMaps,
  getUserMaps,
  getMapByLike,
  getFavs,
} = require('./helper_functions');

module.exports = (db) => {
  // ------ Get The Home Page ------
  router.get('/', (req, res) => {
    let templateVars = { user: req.session.id };
    res.render('index', templateVars);
  });

  // ------ Get Users Created Maps (List) ------
  router.post('/user_maps', (req, res) => {
    let templateVars = { user: req.session.id };

    console.log(templateVars, ' Template Vars from /getusermaps ');

    const mapList = getUserMaps(db);
    mapList.then((data) => {
      templateVars = { user: req.session.id, data: data };

      res.render('index', templateVars);
    });
  });

  // ------ Get Users Favorite Maps (List) ------
  router.post('/fav_maps', (req, res) => {
    let templateVars = { user: req.session.id };

    console.log(templateVars, ' Template Vars from /fav_map ');

    const mapList = getFavs(db);
    mapList.then((data) => {
      templateVars = { user: req.session.id, data: data };

      res.render('index', templateVars);
    });
  });

  // ------ Get Searched Map (Single) ------
  router.post('/search_map', (req, res) => {
    let templateVars = { user: req.session.id };

    console.log(templateVars, ' Template Vars from /search_map ');

    const search = getMapByLike(title, db);
    search.then((data) => {
      templateVars = { user: req.session.id, data: data };
      res.render('index', templateVars);
    });
  });

  // ------ Create A Map ------
  router.post('/create_map', (req, res) => {
    const { title, description } = req.body;
    let queryString = `
      INSERT INTO maps (title, description, date_created)
      VALUES ($1, $2, now()::date) RETURNING *;
    `;
    db.query(queryString, [title, description]).then((data) => {
      res.render('index', templateVars);
    });
  });

  // ------ Logout Handler ------
  router.post('/logout', (req, res) => {
    req.session = null;
    res.render('login');
  });

  // ------ Get Highest Rated Maps (STRETCH) ------
  router.post('/pop_map', (req, res) => {
    console.log('maps search');
  });

  return router;
};

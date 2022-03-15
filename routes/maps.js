const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getMap, getAllMaps } = require('./helper_functions');
const { Template } = require('ejs');


module.exports = (db) => {

  router.use((req, res, next) => {
    if (!req.session.id) {
      res.redirect('/login');
    }
    console.log('Testing ---> Check user');
    next();
  });
  router.use((req, res, next) => {
    if (!req.session.user) {
      
    }
  })



  router.post('/', (req, res) => {
    const { title, description } = req.body;
    let queryString = `
      INSERT INTO maps (title, description, date_created)
      VALUES ($1, $2, now()::date) RETURNING *;
    `;
    db.query(queryString, [title, description]).then((data) =>
      res.redirect('./')
    );
  });

  router.get('/', (req, res) => {

    let templateVars = {};

    mapList = getAllMaps(db);
    mapList.then((data) => {
      templateVars = { data: data };
      res.render('index', templateVars);
    });
  });

  router.post('/maps_search', (req, res) => {
    console.log('test!!!!!!!!!!!!!');
    res.redirect('/');
  });

  return router;
};

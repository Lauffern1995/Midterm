// const { latArr } = require('../public/scripts/app')

// console.log(latArr);
// console.log(longArr);
/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getCoords, postCoordsToDB } = require('./helper_functions');
const bodyParser = require('body-parser');

module.exports = (db) => {
  router.post('/', (req, res) => {
    const user_id = req.session.id;
    const { title, map_id, latitude, longitude } = req.body;
    postCoordsToDB(title, map_id, 1, latitude, longitude, db);
  });
  return router;
};

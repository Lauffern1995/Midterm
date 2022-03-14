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
const { getCoords } = require('./helper_functions');
const bodyParser = require('body-parser');

// const { getCoordinates } = require('../public/scripts/app')
// getCoordinates();

module.exports = (db) => {
  // const getCoordinates = () => {
  //   const lat = event.latLng.toJSON().lat;
  //   const lng = event.latLng.toJSON().lng;
  //   console.log(lat, lng)
  //   }

  router.post('/', (req, res) => {
    const mapID = req.body.title;
    const coords = getCoords(mapID, db);
    coords
      .then((data) => {
        // -------- Pass Long, Lat to google api ↓ --------

        console.log('map/coords data', data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

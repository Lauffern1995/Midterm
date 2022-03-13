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
const router  = express.Router();

// const { getCoordinates } = require('../public/scripts/app')
// getCoordinates();



module.exports = (db) => {

  // const getCoordinates = () => {
  //   const lat = event.latLng.toJSON().lat;
  //   const lng = event.latLng.toJSON().lng;
  //   console.log(lat, lng)
  //   }




  router.get("/", (req, res) => {
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
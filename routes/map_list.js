const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getMap } = require('./helper_functions');


module.exports = (db) => {

  router.get('/', (req, res) => {
    console.log(req.body.title)
    const mapsInDb = getMap(req.body, db);
    mapsInDb.then((data) => {
      console.log(data)
      return data
    })
  })
  return router;
}







const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { getAllMaps } = require('./helper_functions');





module.exports = (db) => {


  router.post('/', (req, res) => {

    let templateVars = null;

    mapList = getAllMaps(db)
    mapList.then(data => {

      templateVars = { map: data}
    })
    console.log(templateVars)



    return res.render('maps', templateVars);

  })

  return router;
}


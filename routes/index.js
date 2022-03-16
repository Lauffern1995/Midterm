const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const {
  getAllMaps,
  getUserMaps,
  getMapByLike,
  getFavs,
  getCoords,
  getMapCoordsByTitle,
} = require('./helper_functions');
const coords = require('./coords');

module.exports = (db) => {
  // ------ Get The Home Page ------
  router.get('/', (req, res) => {
    let templateVars = { user: req.session.id };
    // console.log(templateVars)
    res.render('index', templateVars);
  });



  router.get('/maps', (req, res) => {

    const search = req.query.search

    getMapByLike(search, db)
    .then((data) => {
      console.log('first data ---->', data)
     return getCoords(data[0].id, db)

    })
    .then((data) => {
      console.log('second data ---->', data)
      res.json({coords: data});
    })

  })

// SENDING JSON TO DOM AJAX ///

    router.get('/:mapname', (req, res) => {

      let templateVars = { user: req.session.id };

      const mapName = req.params
      console.log(mapName.search)



      const coords = getMapCoordsByTitle(mapName, db);

       return coords.then(coords => {
        //  console.log('COORDS ===> ', coords);


        templateVars = {user: req.session.id, coords: coords}

        res.json(templateVars)

      })

    });


  // ------ Get Users Created Maps (List) ------
  router.post('/user_maps', (req, res) => {
    let templateVars = { user: req.session.id };
    const user_id = req.session.id;

    // console.log(templateVars, ' Template Vars from /user_maps ');

    const mapList = getUserMaps(user_id, db);
    mapList.then((maps) => {
      templateVars = { user: req.session.id, maps };
      // console.log(templateVars);

      res.render('index', templateVars);
    });
  });

  // ------ Get Users Favorite Maps (List) ------
  router.post('/fav_maps', (req, res) => {
    let templateVars = { user: req.session.id };
    let user_id = req.session.id
    // console.log(templateVars, ' Template Vars from /fav_map ');

    const mapList = getFavs(user_id, db);
    mapList.then((maps) => {
        // console.log()
      templateVars = { user: req.session.id, maps: maps };

      res.render('index', templateVars);
    });

  });

  // ------ Get Searched Map (Single) ------
  router.post('/:map', (req, res) => {

    let templateVars = { user: req.session.id };

    let { title } = req.body;

    // console.log(templateVars, ' Template Vars from /search_map ');

    const search = getMapByLike(title, db);
    search.then((maps) => {
      templateVars = { user: req.session.id, maps: maps };
      res.render('index', templateVars);
    });

  });



  // ------ Create A Map ------
  router.post('/create_map', (req, res) => {
    const templateVars = { user: req.session.id };
    const user_id = req.session.id;
    const { title, description } = req.body;
    let queryString = `
      INSERT INTO maps (user_id, title, description, date_created)
      VALUES ($1, $2, $3, now()::date) RETURNING *;
    `;
    db.query(queryString, [user_id, title, description]).then((data) => {
      res.render('index', templateVars);
    });
  });

  // ------ Update A Map ------
  router.post('/update_map', (req, res) => {
    const templateVars = { user: req.session.id };
    const user_id = req.session.id;
    const { title, description, map_id } = req.body;
    let queryString = `
      UPDATE maps
      SET title = $1, description = $2, last_edited_on = now()::date, last_edited_by = $3
      WHERE id = $4;
    `;
    db.query(queryString, [title, description, user_id, map_id]).then(
      (data) => {
        res.render('index', templateVars);
      }
    );
  });

  // ------ Logout Handler ------
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('login');
  });

  // ------ Get Highest Rated Maps (STRETCH) ------
  router.post('/pop_map', (req, res) => {
    // console.log('maps search');
  });

  return router;
};

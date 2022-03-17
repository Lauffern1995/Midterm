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
  addFav,
  getNameFromDB
} = require('./helper_functions');
const coords = require('./coords');

module.exports = (db) => {
  // ------ Get The Home Page ------
  router.get('/', (req, res) => {
    if (!req.session) {
      res.render('login');
    }
    const templateVars = { user: req.session.id, user_maps: req.session.map, fav_maps: req.session.favs, name: req.session.name }
    res.render('index', templateVars);
    // })



  });

  // SENDING JSON TO DOM AJAX ///

  router.get('/:mapname', (req, res) => {
    let templateVars = {
        user: req.session.id,
        map_id: req.session.map_id,
        user_maps: req.session.map,
        fav_maps: req.session.favs,
        name: req.session.name
        };

    const mapName = req.params;

    const coords = getMapCoordsByTitle(mapName, db);

    return coords.then((coords) => {
      // console.log('COORDS ===> ', coords);
      // console.log('MAP coords===>', coords[0].map_id);

      // req.session.map_id = coords[0].map_id;;
      templateVars = {
        user: req.session.id,
        coords: coords,
        map_id: req.session.map_id,
        user_maps: req.session.map,
        fav_maps: req.session.favs
      };

      res.json(templateVars);
    });
  });

  // ------ Get Users Created Maps (List) ------
  router.post('/user_maps', (req, res) => {
    let templateVars = {
       user: req.session.id,
       user_maps: req.session.map,
        fav_maps: req.session.favs
       };
    const user_id = req.session.id;

    // console.log(templateVars, ' Template Vars from /user_maps ');

    const mapList = getUserMaps(user_id, db);
    mapList.then((maps) => {
      templateVars = {
        user: req.session.id,
        maps,
        user_maps: req.session.map,
        fav_maps: req.session.favs
       };

      res.render('index', templateVars);
    });
  });

  // ------ Get Users Favorite Maps (List) ------
  router.post('/fav_maps', (req, res) => {
    let templateVars = {
      user: req.session.id,
      user_maps: req.session.map,
      fav_maps: req.session.favs
     };
    let user_id = req.session.id;

    const mapList = getFavs(user_id, db);
    mapList.then((maps) => {
      // console.log()
      templateVars = {
         user: req.session.id,
         maps: maps, user_maps: req.session.map,
        fav_maps: req.session.favs
      };

      res.render('index', templateVars);
    });
  });


  // -------- Make This Map One of Your Favs! ------- ///

  router.post('/add_fav', (req, res) => {
    const templateVars = {
      user: req.session.id,
      map_id: req.session.map_id,
      user_maps: req.session.map,
      fav_maps: req.session.favs
     };
    const user_id = req.session.id;
    const map_id = req.session.map_id;


    let queryString = `
    INSERT INTO favourite_maps (user_id, map_id)
    VALUES ($1, $2) RETURNING *;
    `;
    db.query(queryString, [user_id, map_id]).then((data) => {
      res.render('index', templateVars);
    });
  });


  // ------ Create A Map ------
  router.post('/create_map', (req, res) => {
    const templateVars = {
      user: req.session.id,
      user_maps: req.session.map,
      fav_maps: req.session.favs,
      name: req.session.name
     };
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
    const templateVars = {
      user: req.session.id,
      user_maps: req.session.map,
      fav_maps: req.session.favs
     };
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

  // ------ Add Coords ------

  router.post('/coords_post', (req, res) => {
    const templateVars = {
      user: req.session.id,
     };
    const user_id = req.session.id;
    console.log('BODY', req.body);
    console.log('DATA', req.data);
    const { title, map_id, latitude, longitude } = req.body;
    postCoordsToDB(title, map_id, user_id, latitude, longitude, db);
  });

  // ------ Logout Handler ------
  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect('login');
  });

  // ------ Get Searched Map (Single) ------
  router.post('/:map', (req, res) => {
    let templateVars = { user: req.session.id };

    let { title } = req.body;

    const search = getMapByLike(title, db);
    search.then((maps) => {
      templateVars = { user: req.session.id, maps: maps, name: req.session.name, fav_maps: req.session.favs, user_maps: req.session.map };
      res.render('index', templateVars);
    });
  });

  // ------ Get Highest Rated Maps (STRETCH) ------
  router.post('/pop_map', (req, res) => {
    // console.log('maps search');
  });

  return router;
};

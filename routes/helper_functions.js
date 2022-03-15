// ***************** LOGIN/REGI HELPERS *******************//
const checkLogin = function (user, db) {
  return db
    .query(
      `
  SELECT email, id
  FROM users
  WHERE email = $1;
  `,
      [`${user.email}`]
    )
    .then((user) => {
      return user.rows[0];
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// ******************* MAP HELPERS *********************//
const getAllMaps = function (db) {
  return db
    .query(
      `
  SELECT title
  FROM maps
  `
    )
    .then((res) => res.rows);
};

// ------ Search For A Map by ID ------
const getMap = function (map, db) {
  return db
    .query(
      `
  SELECT *
  FROM maps
  WHERE id = $1;
  `,
      [map]
    )
    .then((res) => res.rows[0]);
};

// ------ Search For A Map by Title ------
const getMapByLike = function (title, db) {
  return db
    .query(
      `
  SELECT *
  FROM maps
  WHERE title = $1;
  `,
      [title]
    )

    .then((res) => res.rows[0])

    .catch((err) => {
      console.log('ERR', err);
    });
};

// ------ Get Maps for User ------
getUserMaps = function (user, db) {
  return db
    .query(
      `
    SELECT *
    FROM maps
    WHERE user_id = $1
  `,
      [user_id]
    )
    .then((res) => res.rows[0]);
};

// ------ Get Favorite Maps for User ------
const getFavs = function (user, db) {
  return db
    .query(
      `
  SELECT map_id
  FROM favourite_maps
  JOIN user ON user.id = user_id
  WHERE user_id = $1;
  `,
      [user.id]
    )
    .then((res) => res.rows[0]);
};

// const insertCoords = function (placeholder, db) {
//   let queryString = (`
//   INSERT INTO coords (title, map_id, user_id, longitude, latitude, description)
//   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
//   `);
//   return db.query(queryString, [title, map_id, user_id, longitude, latitude, description])
//   .then((data) =>
//    console.log(data);
// )}

// ******************* COORDS HELPERS *********************//

const getCoords = function (map, db) {
  return db
    .query(
      `
    SELECT longitude, latitude
    FROM coords
    WHERE map_id = $1;
  `,
      [map]
    )
    .then((res) => res.rows);
};

//********************** LATLNG L00P**********************/

const testPins = [
  { longitude: '47.5706', latitude: '47.5706', map_id: 3 },
  { longitude: '47.5678', latitude: '47.2347', map_id: 3 },
  { longitude: '47.5234', latitude: '47.7686', map_id: 3 },
  { longitude: '47.7866', latitude: '47.3456', map_id: 3 },
];

const pinDropper = function (results) {
  return results.map((pin) => {
    return [pin.latitude, pin.longitude, pin.map_id];
  });
};

// console.log(pinDropper(testPins));

// const createMap = function(title, description) {

//   let queryString = (`
//       INSERT INTO maps (user_id, title, description, rating, date_created, last_edited_on, last_edited_by)
//       VALUES ($1, $2, $3, $4, now()::date, now()::date, $5) RETURNING *;
//     `);
//      return db.query(queryString, [user_id, title, description, rating, created_at, last_edited_on, last_edited_by])
//     .then((data) =>
//       res.redirect("./"))
// }

// DROP TABLE IF EXISTS maps CASCADE;
// CREATE TABLE maps (
//   id SERIAL PRIMARY KEY NOT NULL,
//   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//   title VARCHAR(255),
//   description TEXT,
//   rating SMALLINT NOT NULL DEFAULT 0,
//   date_created DATE NOT NULL,
//   last_edited_on DATE NOT NULL,
//   last_edited_by INTEGER REFERENCES users(id) ON DELETE CASCADE
// );

module.exports = {
  checkLogin,
  getMap,
  getFavs,
  getMapByLike,
  getCoords,
  pinDropper,
  getAllMaps,
};

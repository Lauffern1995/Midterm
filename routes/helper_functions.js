



const checkLogin = function (user, db) {
  return db.query(`
  SELECT email, id
  FROM users
  WHERE email = $1;
  `, [`${user.email}`])
    .then (user => {
      return(user.rows[0]);
    })
    .catch(err => {
      console.log('err', err)
    })

  }



const getMap = function (map, db) {
  return db.query(`
  SELECT *
  FROM maps
  WHERE id = $1;
  `, [`${map}`])
  .then(res => res.rows[0]);
};


const getFavs = function (user, db) {
  return db.query(`
  SELECT map_id
  FROM favourite_maps
  WHERE user_id = $1;
  `, [user.id])
  .then(res => res.rows[0]);
};


module.exports = {
checkLogin,
getMap,
getFavs,
}



// DROP TABLE IF EXISTS favourite_maps CASCADE;
// CREATE TABLE favourite_maps (
//   id SERIAL PRIMARY KEY NOT NULL,
//   user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//   map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE
// );


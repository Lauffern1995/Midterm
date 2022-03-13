



const checkLogin = function (user, db) {
  return db.query(`
  SELECT email
  FROM users
  WHERE email = $1;
  `, [`${user.email}`])
    .then (user => {

      return user.rows[0];
      })
    .catch( error => {
      console.log("caught ", error);
    })
}

// const getMap = function (db, map) {
//   return db.query(`
//   SELECT *
//   FROM maps
//   WHERE id = $1
//   `, [map])
//   .then(res => res.rows[0]);
// };



module.exports = {
checkLogin,
}


const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    let queryString = `
  SELECT *
  FROM users
  `;
  db
  .query(queryString).then((data) => console.log(data.rows))
  res.render("login");
});
return router;
};





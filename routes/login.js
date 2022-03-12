const express = require('express');
const router  = express.Router();


module.exports = () => {
  console.log()
  router.get("/", (req, res) => {
  res.render("login");
});
return router;
};


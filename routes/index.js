const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');


module.exports = () => {
  router.get("/", (req, res) => {
  let templateVars = {
  cookie: req.session.user_id
  };
res.render('index', templateVars);
});
return router;
};


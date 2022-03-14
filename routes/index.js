const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session')

// How to query selector and append

// Can you have more than one get/post in each route file

// Best practices on querying api using database data






module.exports = () => {
  router.get("/", (req, res) => {
  let templateVars = {

  user: req.session.user_id,

  };

res.render('index', templateVars);
});
return router;
};


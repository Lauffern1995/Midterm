const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { checkLogin } = require('./helper_functions');

module.exports = (db) => {



  router.get('/', (req, res) => {

    if(req.session.id) {
      res.redirect('/')
    }


    res.render('login')

  });



  router.post('/', (req, res) => {
    if (req.session.id) {
      const templateVars = { user: user[req.session.id] }

      console.log('Template Vars in ----> login', templateVars)

      const isEmailInDb = checkLogin(req.body, db);
      isEmailInDb
        .then((data) => {
          if (req.session.id === data.id) {
            res.render('/', templateVars);
          } else {
            res.status(400).send('Email does not exist');
            return;
          }
        })
        .catch(() => {
          res
            .status(400)
            .send(
              'Email not registered, Please <a href="/login">register!</a>'
            );
          return;
        });
    }
  });
  return router;
};

var express = require('express');
var router = express.Router();


var Users = [{
  username: "priya@abc.com",
  password: "admin"
}]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function (req, res) {
  Users.filter(function (user) {
    if (user.username === req.body.username && user.password === req.body.password) {
      res.cookie('cookie', "admin", { maxAge: 900000, httpOnly: false, path: '/' });
      //req.session.user = user;
      res.json({ message: 'Successful Login' })
      //   res.end("Successful Login");

    }
    else {
      res.status(400).json({ message: 'Invalid Credentials' });
    }
  })
});
module.exports = router;
